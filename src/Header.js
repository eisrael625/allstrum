import './Header.css';
import logo from './logo.png';

function Header() {

    const handlePreOrderClick = () => {
        window.location.href = "https://forms.gle/gxEsbb1r3G3446Xg7";
    };
    
  return (
    <div className='Header'>
      <div className='Logo'>
        <img src={logo} alt='Company logo showing accessible music device'></img>
      </div>
      <div className="Name">
        <h1>All Strum: Making Stringed Instruments Accessible For All</h1>
        <div className='Buttons'>
          <h2 onClick={handlePreOrderClick} className='Button'>Pre-Order Now!</h2>    
        </div>
      </div>
    </div>
  );
}

export default Header;
