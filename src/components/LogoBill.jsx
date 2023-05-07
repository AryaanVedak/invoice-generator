import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "antd";
import jsPDF from "jspdf";
import numWords from "num-words";
import companyLogo from "../assets/companyLogo.jpg"

const LogoBill = () => {

  const  back = useNavigate()
  const location = useLocation()

  const handleBack = () => {
    back("/");
  }

  // location.state.map(item => setTotal(item.rate + ((item.rate*(item.gst/2))/100)*2))

  const generatePDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.html(document.querySelector("#bill"), {
      callback: function (pdf) {
        const pageCount = doc.internal.getNumberOfPages();
        console.log(pageCount)
        doc.deletePage(pageCount)
        pdf.save("bill.pdf")
      }
    })

  }

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }

  return (
    <>
      <Button type={"default"} onClick={handleBack}>Back</Button>&nbsp;
      <Button type={"primary"} onClick={generatePDF}>Download</Button>
      <div className="wholePrintBody page-break" id="bill" style={{marginBottom: 0}}>
        <header>
          <div style={{marginTop: 50, width: 585, textAlign: 'right', marginBottom: 15}}>
            <img src={companyLogo} alt='company logo' style={{height: '70px'}}/>
          </div>
          <div className="allBorder">
            <section className="leftSection ">
              <p style={{margin: 5, fontSize: 14, fontWeight: 'bold'}}>OMKAR CREATIONS</p>
              <p className="address" style={{margin: 5}}>
                A-401 Prakriti Aprt, M.S. Road, Mittal Park,<br/>
                Raghunath Nagar, Thane(W),<br/>
                Dist.Thane-400604,Maharashtra
              </p>
              <p style={{margin: 5}}>
                <b>Mob</b>
                <label className="ph_no">8779674027</label>
              </p>
            </section>
            <section className="rightSection ">
              <table style={{margin: 5}}>
                <tr>
                  <td>Invoice No.</td>
                  <td>
                    <label>{location.state.billNo}</label>
                  </td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>
                    <label>{location.state.date}</label>
                  </td>
                </tr>
                <tr>
                  <td>GST No.</td>
                  <td>
                    <label>27AFFPV7912N1ZP</label>
                  </td>
                </tr>
              </table>
            </section>
            <div className="clearfix"></div>
          </div>
        </header>
        <br/>
        <main>
          <section className="medicalDetails allBorder">
            <div>
              <p style={{margin: 5, fontSize: 14, fontWeight: 'bold'}}>BUYER</p>
              <p style={{fontWeight: "bold", margin: 5}}>FREUDENBERG GALA HOUSEHOLD PRODDUCT PRIVATE LIMITED</p>
              <p className="buyer-address" style={{margin: 5}}>
                902/903/904, B-Wing, O2 Galleria, Plot No. 23/24, Minevera Industrial Estate Off LBS Marg, Opp Asha Nagar<br/>
                Mulund(W), Mumbai - 400604, Maharashtra.<br/>
                GSTIN: 27AADCG4345E1ZT<br/>
                PAN: AADCG4345E
                {location.state.buyAddress}
              </p>
              <div className="clearfix"></div>
            </div>
          </section>
          <section className="itemDetailSection allBorder">
            <div>
              <table cellSpacing="0" className="billProductDetailsTable bottomBorder">
                <thead>
                <tr>
                  <th rowSpan="2">Sr. No.</th>
                  <th rowSpan="2" colSpan="3">Description</th>
                  <th rowSpan="2">HSN Code</th>
                  <th rowSpan="2">Rate</th>
                  <th rowSpan="2">Quantity</th>
                  <th rowSpan="2">Amount</th>
                  <th rowSpan="2" colSpan="2">Taxable Value</th>
                  <th colSpan="2">CGST</th>
                  <th colSpan="2">SGST/UGST</th>
                  <th rowSpan="2">Tax Amount</th>
                  <th rowSpan="2">Total Amount</th>
                </tr>
                <tr>
                  <th style={{borderLeft: "1px solid black"}}>Rate</th>
                  <th>Amount</th>
                  <th>Rate</th>
                  <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {
                  location.state.product.map(item =>
                    // eslint-disable-next-line react/jsx-key,no-unexpected-multiline
                    <tr>
                      <td>{item.id + 1}</td>
                      <td colSpan="3"><b>{item.itemTitle}</b><br/>{item.itemDescription}</td>
                      <td></td>
                      <td>{item.rate}</td>
                      <td>1</td>
                      <td>{item.rate}</td>
                      <td colSpan="2">{item.rate}</td>
                      <td>{item.gst / 2}%</td>
                      <td>{(item.rate * (item.gst / 2)) / 100}</td>
                      <td>{item.gst / 2}%</td>
                      <td>{(item.rate * (item.gst / 2)) / 100}</td>
                      <td>{((item.rate * (item.gst / 2)) / 100) * 2}</td>
                      <td>{item.rate + ((item.rate * (item.gst / 2)) / 100) * 2}</td>
                    </tr>
                  )
                }
                <tr>
                  <th colSpan="15" style={{border: "1px solid black", borderBottom: "0px"}}></th>
                  <th style={{border: "1px solid black", borderBottom: "0px", fontSize: "10px"}}>{location.state.total}</th>
                </tr>
                </tbody>

              </table>
              <p>Amount Chargable(in words): {toTitleCase(numWords(location.state.total))}</p>
            </div>
            <div className="terminology topBorder">
              <div>
                <table className="terminologyLeftTable">
                  <h3 className="bank-details">Bank Details</h3>
                  <tr>
                    <td>Bank:</td>
                    <td colSpan={2}>Punjab & Sind Bank</td>
                  </tr>
                  <tr>
                    <td>Account No:</td>
                    <td colSpan={2}>1256985621245</td>
                  </tr>
                  <tr>
                    <td>Branch</td>
                    <td colSpan={2}>Thane Branch</td>
                  </tr>
                  <tr>
                    <td>IFSC Code</td>
                    <td colSpan={2}>PSB00045</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td colSpan={2}>Tulsi Shyam Teen Hath Naka, Thane(W), 400604</td>
                  </tr>
                </table>
                <table className="terminologyRightTable">
                  <p className="sign">
                    Omkar Creations <br/>
                    Authorized Signatory
                  </p>
                </table>
              </div>
              <div className="clearfix"></div>
            </div>
          </section>
        </main>
        <p style={{marginTop: 0}}>Declaration: * No Complaint regarding this bill will be entertained if not noticed in writing within 7 days.</p>
      </div>
    </>
  )
}

export default LogoBill