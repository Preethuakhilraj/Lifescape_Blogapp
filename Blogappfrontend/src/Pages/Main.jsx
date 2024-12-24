import Footer from './Footer';
import Navbar from './Navbar';

const Main=({child}) =>{
  return (
    <div>
      <Navbar />
      {child}
      <Footer/>
    </div>
  );
}
export default Main