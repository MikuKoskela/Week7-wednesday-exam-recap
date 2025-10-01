const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Product Search</h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/add-product">Add Product</a>
           <a href="/signup">Sign up</a>
        <a href="/login">Log in</a>
      </div>
    </nav>
  );
}
 
export default Navbar;