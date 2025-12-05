// import './Header.css';
// import logo from './logo.png';

// function Header() {

//     const handlePreOrderClick = () => {
//         window.location.href = "https://forms.gle/gxEsbb1r3G3446Xg7";
//     };
    
//   return (
//     <div className='Header'>
//       <div className='Logo'>
//         <img className='LogoPic' src={logo} alt='Company logo showing accessible music device'></img>
//       </div>
//       <div className="Name">
//               <h1 className='headerWeb'>All Strum: Making Stringed Instruments Accessible For All</h1>
//               <h1 className='headerMobile'>All Strum: Accessible Music For All</h1>
//         <div className='Buttons'>
//           <h2 onClick={handlePreOrderClick} className='Button'>Pre-Order Now!</h2>    
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Header;
// Header.jsimport React from 'react';
import './Header.css';
import logo from './logo.png'; // ← your logo file

function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">

        {/* BRAND + LOGO */}
        <a href="#products" className="brand">
          <img src={logo} alt="AllStrum Logo" className="brand-logo" />
          <span className="brand-text">AllStrum</span>
        </a>

        {/* NAVIGATION */}
        <nav className="site-nav">
          <a href="#products">Products</a>
          <a href="#story">Story</a>
          <a href="#videos">Videos</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </nav>

      </div>
    </header>
  );
}

export default Header;
