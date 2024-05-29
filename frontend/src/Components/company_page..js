import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Applied_Companies from "./Applied_Companies";
import ShareHrContact from "./ShareHrConatct";
import Companies from "./Companies";
import MyHRList from "./MyHRList";
import HRList from "./HRList";
import './company_page.css';
export default function company_page() {
  //     return (
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
      <header className="text-center mt-2 p-2 header row">
        <h3 className="col-4">Tnp Website</h3>
        <input
          className="search-input col-4"
          type="text"
          placeholder="Search"
        ></input>
      </header>
      <section className="mt-2 p-2 row">
        <BrowserRouter>
          <nav className="col-3">
            <div className="col-12 btn mt-2 p-2 links">
              <Link to="/Companies">
                <h6> Companies</h6>
              </Link>
            </div>
            <div className="col-12 btn  mt-2 p-2 links">
              <Link to="/Applied">
                <h6>Applied Companies</h6>
              </Link>
            </div>
            <div className="col-12 btn  mt-2 p-2 links">
              <Link to="/ShareHrContact">
                <h6>ShareHrContact</h6>
              </Link>
            </div>
            <div className=" col-12 btn  mt-2 p-2 links">
              <Link to="/MyHrList">
                <h6>MyHrList</h6>
              </Link>
            </div>
            <div className="col-12 btn mt-2 p-2 links">
              <Link to="/HrList">
                <h6>HRList</h6>
              </Link>
            </div>
            <div className="col-12 btn mt-2 p-2 links">
              <Link to="/logout">logout</Link>
            </div>
          </nav>
          <main className="col-9">
            <Routes>
              <Route path="Companies" element={<Companies />} />
              <Route path="Applied" element={<Applied_Companies />} />
              <Route path="ShareHrContact" element={<ShareHrContact />} />
              <Route path="HRList" element={<HRList />} />
              <Route path="MyHRList" element={<MyHRList />} />
              {/* <Route path="logout" element={<Logout />} /> */}
            </Routes>
            <Outlet />
          </main>
        </BrowserRouter>
      </section>
    </div>
  );
}
