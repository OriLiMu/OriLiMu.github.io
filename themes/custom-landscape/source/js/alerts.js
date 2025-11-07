// GitHub Alerts Converter
document.addEventListener('DOMContentLoaded', function() {
  // 查找所有包含alert语法的blockquote
  const blockquotes = document.querySelectorAll('blockquote');

  blockquotes.forEach(blockquote => {
    const content = blockquote.innerHTML;

    // 检查是否包含alert语法
    if (content.includes('[!NOTE]')) {
      convertAlert(blockquote, 'note', '💡', '[!NOTE]');
    } else if (content.includes('[!TIP]')) {
      convertAlert(blockquote, 'tip', '✨', '[!TIP]');
    } else if (content.includes('[!IMPORTANT]')) {
      convertAlert(blockquote, 'important', '❗', '[!IMPORTANT]');
    } else if (content.includes('[!WARNING]')) {
      convertAlert(blockquote, 'warning', '⚠️', '[!WARNING]');
    } else if (content.includes('[!CAUTION]')) {
      convertAlert(blockquote, 'caution', '🚨', '[!CAUTION]');
    }
  });

  function convertAlert(element, type, icon, marker) {
    // 移除marker并获取内容
    let content = element.innerHTML.replace(marker, '').trim();

    // 检查是否有标题（第一行）
    const lines = content.split('<br>');
    let title = '';
    let body = content;

    if (lines.length > 1) {
      // 第一行作为标题
      title = lines[0].trim();
      body = lines.slice(1).join('<br>').trim();
    } else {
      // 没有标题，使用默认标题
      title = type.charAt(0).toUpperCase() + type.slice(1);
    }

    // 创建alert HTML结构
    const alertHtml = `
      <div class="alert alert-${type}">
        <div class="alert-title">${icon} ${title}</div>
        <div class="alert-content">${body}</div>
      </div>
    `;

    // 替换原来的blockquote
    element.outerHTML = alertHtml;
  }
});