$(function() {
    'use strict';

    const inputArea = document.getElementById('inputArea');
    const tableBody = document.getElementById('tableBody');
    const recordCount = document.getElementById('recordCount');
    const formatBtn = document.getElementById('formatBtn');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');
    const exportCsvBtn = document.getElementById('exportCsvBtn');

    // 用于存储提示元素
    let copyTip = null;

    // ---------- 解析核心 ----------
    function parseData(text) {
        if (!text.trim()) return [];
        let blocks = text.split(/\n\s*\n/);
        if (blocks.length <= 1) {
            blocks = text.split(/(?=^(?:售后|拒收)\s*$)/m).filter(p => p.trim().length > 0);
        }
        const results = [];
        for (let block of blocks) {
            const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
            if (lines.length === 0) continue;

            let orderNo = '', product = '', receiver = '', tracking = '', status = '', returnNo = '';
            const unmatched = [];

            for (let line of lines) {
                let matched = false;

                let m = line.match(/订单编号[：:]\s*([A-Za-z0-9]+)/);
                if (m) { orderNo = m[1]; matched = true; }

                if (!matched) {
                    m = line.match(/(?:商品名称|商品)[：:]\s*(.+)/);
                    if (m) { product = m[1]; matched = true; }
                }

                if (!matched) {
                    m = line.match(/收货(?:人)?信息[：:]\s*(.+)/);
                    if (m) { receiver = m[1]; matched = true; }
                }

                if (!matched) {
                    m = line.match(/(?:运单号|原单号)[：:]\s*(.+)/);
                    if (m) { tracking = m[1]; matched = true; }
                }

                if (!matched) {
                    m = line.match(/退货单号[：:]\s*(.+)/);
                    if (m) { returnNo = m[1]; matched = true; }
                }

                if (!matched) {
                    if (/退货已签收|售后成功|买家已退货|商家已同意|售后申请待商家处理|商家已同意售后申请|退款成功/.test(line)) {
                        status = line;
                        matched = true;
                    }
                }

                if (!matched && !/^(?:售后|拒收)\s*$/.test(line)) {
                    unmatched.push(line);
                }
            }

            if (!status) {
                for (let line of unmatched) {
                    if (/退货已签收|售后成功|买家已退货|商家已同意|售后申请待商家处理|商家已同意售后申请|退款成功/.test(line)) {
                        status = line;
                        break;
                    }
                }
            }

            results.push({ orderNo, product, receiver, tracking, status, returnNo });
        }

        return results.filter(r => r.orderNo || r.product || r.receiver || r.tracking || r.status || r.returnNo);
    }

    // ---------- 渲染 ----------
    function renderTable(data) {
        if (!data || data.length === 0) {
            tableBody.innerHTML = `<tr class="empty-row"><td colspan="6">暂无数据，请在上方粘贴内容</td></tr>`;
            recordCount.textContent = '共 0 条';
            return;
        }

        let html = '';
        for (let row of data) {
            html += `<tr>
                <td>${escHtml(row.orderNo)}</td>
                <td>${escHtml(row.product)}</td>
                <td>${escHtml(row.receiver)}</td>
                <td>${escHtml(row.tracking)}</td>
                <td>${row.status ? `<span class="status-tag">${escHtml(row.status)}</span>` : ''}</td>
                <td>${escHtml(row.returnNo)}</td>
            </tr>`;
        }
        tableBody.innerHTML = html;
        recordCount.textContent = `共 ${data.length} 条`;
    }

    function escHtml(str) {
        if (!str) return '';
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // ---------- 主流程 ----------
    function formatData() {
        const text = inputArea.value;
        const parsed = parseData(text);
        renderTable(parsed);
        window._lastData = parsed;
    }

    let debounceTimer = null;
    function autoFormat() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(formatData, 400);
    }

    // ---------- 事件绑定 ----------
    inputArea.addEventListener('input', autoFormat);
    formatBtn.addEventListener('click', formatData);

    clearBtn.addEventListener('click', function() {
        inputArea.value = '';
        renderTable([]);
        window._lastData = [];
    });

    // ---------- 复制（无表头，提示紧挨按钮左侧） ----------
    copyBtn.addEventListener('click', function() {
        const data = window._lastData || [];
        if (data.length === 0) return;

        const rows = data.map(r => [
            r.orderNo, r.product, r.receiver, r.tracking, r.status, r.returnNo
        ]);
        const tsv = rows.map(r => r.join('\t')).join('\n');

        // 复制逻辑
        const copyFn = () => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(tsv).catch(() => fallbackCopy(tsv));
            } else {
                fallbackCopy(tsv);
            }
        };

        const fallbackCopy = (text) => {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        };

        copyFn();

        // 显示提示
        if (copyTip) {
            copyTip.textContent = '✅ 已复制';
            copyTip.style.opacity = '1';
            clearTimeout(copyTip._timer);
            copyTip._timer = setTimeout(() => {
                copyTip.style.opacity = '0';
            }, 2000);
        }
    });

    // ---------- 导出 CSV ----------
    exportCsvBtn.addEventListener('click', function() {
        const data = window._lastData || [];
        if (data.length === 0) return;

        const header = ['订单号', '商品名称', '收货信息', '商品快递单号', '状态', '退货单号'];
        const rows = data.map(r => [
            r.orderNo, r.product, r.receiver, r.tracking, r.status, r.returnNo
        ]);
        const escape = (str) => {
            if (!str) return '';
            const s = String(str);
            if (s.includes(',') || s.includes('"') || s.includes('\n')) {
                return '"' + s.replace(/"/g, '""') + '"';
            }
            return s;
        };
        const csv = [header.map(escape).join(','), ...rows.map(r => r.map(escape).join(','))].join('\n');
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = '售后数据.csv';
        link.click();
        URL.revokeObjectURL(link.href);
    });

    // ---------- 初始化 ----------
    function init() {
        // 将复制按钮和提示包裹在一个容器中，容器整体靠右
        const parent = copyBtn.parentNode;

        // 创建容器
        const wrapper = document.createElement('span');
        wrapper.style.cssText = 'display: inline-flex; align-items: center; margin-left: auto;';

        // 创建提示元素
        copyTip = document.createElement('span');
        copyTip.id = 'copyTip';
        copyTip.style.cssText = `
            display: inline-block;
            margin-right: 8px;
            background: #e6f7e6;
            color: #2d7d2d;
            padding: 2px 10px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
        `;

        // 将 copyBtn 从父节点移除，然后插入 wrapper
        parent.insertBefore(wrapper, copyBtn);
        wrapper.appendChild(copyTip);
        wrapper.appendChild(copyBtn);

        // 移除 copyBtn 原有的 margin-left:auto（因为 wrapper 已设置）
        copyBtn.style.marginLeft = '0';

        // 如果文本框为空，显示空状态
        if (!inputArea.value.trim()) {
            renderTable([]);
        } else {
            formatData();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.formatData = formatData;
})();