import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Applied_Companies from "./Applied_Companies";
import ShareHrContact from "./ShareHrConatct";
import Companies from "./Companies";
import MyHRList from "./MyHRList";
import HRList from "./HRList";
import AddCompany from "./AddComapny";
import '../Styles/compage.css'
import Announcement from './Announcement'
import ShareCompanyContact from "./ShareCompanyContact";
export default function company_page() {

  function handleClick(e) {
    document.getElementById('active').id = 'a';
    e.target.id = 'active';
  }




  //     retu
  //     <div className="conatiner-fluid">
  // <div className="bg-danger">
  //    <div className="col-5 "><h1>Tnp_website</h1></div>
  //    <div className="col-7"><input className="search-input" type="text" placeholder="Search"></input>
  //     </div>
  //     </div>
  // <BrowserRouter>
  //     <div className="section">
  //         <div className="col-3">
  //         <nav>
  //          <ul>

  //             <li btn ><Link to="/Applied">Applied Companies</Link></li>
  //             <li><Link to="/ShareHrContact">ShareHrContact</Link></li>
  //             <li><Link to="/HrList">HR List</Link></li>
  //             <li><Link to="/MyHrList">MyHrList</Link></li>
  //             {/* <li><Link to="/logout">logout</Link></li> */}
  //          </ul>
  //          </nav>
  //         </div>
  //         <Routes>
  //         <Route path="Applied" element=<Applied_Companies/> />
  //          <Route path="ShareHrContact" element={<ShareHrContact/>} />
  //         <Route path="HRList" element={<HRList/>}/>
  //         <Route path="MyHRList" element={<MyHRList/>}/>
  //         {/* <Route path="logout" element={<Logout/>}/>  */}
  //        </Routes>
  //      </div>
  //      <div className="col-8">
  //         <Outlet/>
  //      </div>
  //     </BrowserRouter>
  //     </div>

  // )
  return (
    <div className="container-fluid">
      <header className=" mt-2 header row">
        <h3 className="col-4">Tnp Website</h3>
        <div className="col-4"></div>
        <div className='col-4'> </div>
      </header>
      <section className="mt-2 row">
        <BrowserRouter>
          <nav className="col-2">

            <Link to="/Companies">
              <div className="col-12 p-2 mt-2 .lnav" id="active" onClick={handleClick}>
                <h5>Companies</h5></div>
            </Link>

            <Link to="/Applied">
              <div className="col-12 p-2  mt-2 .lnav "  onClick={handleClick}>
                <h5> Applied Companies</h5>
              </div>
            </Link>


            <Link to="/ShareHrContact">
            <div className="col-12 p-2 mt-2 ,lnav" onClick={handleClick}>
              <h5>Share Hr Conatct</h5>
              </div>
            </Link>
            <Link to="/ShareCompanyContact">
            <div className="col-12 p-2 mt-2 ,lnav" onClick={handleClick}>
              <h5>Share Company Conatct</h5>
              </div>
            </Link>


            <Link to="/MyHrList">
              <div className=" col-12 p-2 mt-2  lnav" onClick={handleClick}>
              <h5>MyHRList</h5>
              </div>

            </Link>


            <Link to="/HrList">
              <div className="col-12 p-2 mt-2 " onClick={handleClick}>
              <h5>HRList</h5>
              </div>

            </Link>
            <Link to="/AddCompany">
              <div className="col-12 p-2 mt-2 " onClick={handleClick}>
              <h5>AddComapny</h5>
              </div>

            </Link>

            <Link to="/logout" onClick={handleClick}>
             <div className="col-12 p-2 mt-2" >
            <h5>logout</h5>
            </div>
            </Link>

          </nav>
          <main className="col-6 m-2">
            <Routes>
              <Route path="Companies" element={<Companies />} />
              <Route path="Applied" element={<Applied_Companies />} />
              <Route path="ShareHrContact" element={<ShareHrContact />} />
              <Route path="HRList" element={<HRList />} />
              <Route path="MyHRList" element={<MyHRList />} />
              <Route path="AddCompany" element={<AddCompany />} />
              <Route path="ShareCompanyContact" element={<ShareCompanyContact />} />
              {/* <Route path="logout" element={<Logout />} /> */}
            </Routes>
            <Outlet />
          </main>
          <div className="col-3 m-2 announcement">
            <Announcement />
          </div>
        </BrowserRouter>
      </section>
    </div>
  );
}
