// 創建導航欄HTML內容
const createNavBar = () => {
  const navHTML = `
    <div class="container nav">
        <div class="brand">
          <img src="img/griffithtop.jpeg" alt="Jyue-An Yao" class="nav-avatar"> 
          <span class="brand-text">Jyue-An Yao</span>
        </div>
      <nav class="nav__links" aria-label="Main navigation">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html">Works and Projects</a>
        <a href="contact.html">Contact</a>
      </nav>
    </div>
  `;

  // 找到header元素並插入導航欄
  const header = document.querySelector('.header');
  if (header) {
    header.innerHTML = navHTML;
  }
};

// 當DOM加載完成時初始化導航欄
document.addEventListener('DOMContentLoaded', createNavBar);
