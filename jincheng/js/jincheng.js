// formatter.js（增强版：空状态补退货退款 + 换货识别）
$(function() {
    'use strict';

    const inputArea = document.getElementById('inputArea');
    const tableBody = document.getElementById('tableBody');
    const recordCount = document.getElementById('recordCount');
    const formatBtn = document.getElementById('formatBtn');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');
    const exportCsvBtn = document.getElementById('exportCsvBtn');

    let copyTip = null;

    // ---------- 解析核心 ----------
    function parseData(text) {
        if (!text.trim()) return [];
        let blocks = text.split(/\n\s*\n/);
        if (blocks.length <= 1) {
            blocks = text.split(/(?=^(?:售后)\s*$)/m).filter(p => p.trim().length > 0);
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
                    m = line.match(/(?:商品名称|商品|产品名称|产品名|产品)[：:]\s*(.+)/);
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

                // ---------- 状态检测：扩展关键词（新增“换货”） ----------
                if (!matched) {
                    if (/退货已签收|买家已退货|商家已同意|售后申请待商家处理|商家已同意售后申请|退款成功|仅退款|退款|同意|拒绝|退货|拦截|拒收|换货/.test(line)) {
                        status = line;
                        matched = true;
                    }
                }

                if (!matched && !/^(?:售后)\s*$/.test(line)) {
                    unmatched.push(line);
                }
            }

            // 如果 status 仍为空，尝试从 unmatched 中取第一条
            if (!status && unmatched.length > 0) {
                for (let line of unmatched) {
                    if (/订单编号|商品|收货|运单|原单|退货单号/.test(line)) continue;
                    status = line;
                    break;
                }
                if (!status) {
                    status = unmatched[0];
                }
            }

            // ---------- 新增：无状态但有退货单号，自动补“退货退款” ----------
            if (!status && returnNo) {
                status = '退货退款';
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

    // ---------- 复制 ----------
    copyBtn.addEventListener('click', function() {
        const data = window._lastData || [];
        if (data.length === 0) return;

        const rows = data.map(r => [
            r.orderNo, r.product, r.receiver, r.tracking, r.status, r.returnNo
        ]);
        const tsv = rows.map(r => r.join('\t')).join('\n');

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
        // 包裹复制按钮和提示
        const parent = copyBtn.parentNode;
        const wrapper = document.createElement('span');
        wrapper.style.cssText = 'display: inline-flex; align-items: center; margin-left: auto;';
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
        parent.insertBefore(wrapper, copyBtn);
        wrapper.appendChild(copyTip);
        wrapper.appendChild(copyBtn);
        copyBtn.style.marginLeft = '0';

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
});