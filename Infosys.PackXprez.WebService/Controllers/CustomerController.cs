using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Infosys.PackXprez.DataAccessLayer;
using Infosys.PackXprez.DataAccessLayer.Models;
using Infosys.PackXprez.WebService.Model;

namespace Infosys.PackXprez.WebService.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CustomerController : Controller
    {
        PackXprezDAL packXprezObj;

        public CustomerController()
        {
            packXprezObj = new PackXprezDAL();
        }

        [HttpGet]
        public JsonResult GetCustomer(int custId)
        {
            Customer lstCust = new Customer();
            try
            {
                lstCust = packXprezObj.GetCustomers(custId);
            }
            catch (Exception)
            {
                lstCust = null;
            }
            return Json(lstCust);
        }


        [HttpGet]
        public JsonResult GetAddressByCustId(int custId)
        {
            List<Address> listAddress = new List<Address>();
            try
            {
                listAddress = packXprezObj.GetAddressByCustId(custId);
            }
            catch (Exception)
            {
                listAddress = null;
            }
            return Json(listAddress);
        }

        [HttpGet]
        public JsonResult GetAddressByCustAddressId(int custId,int addId)
        {
            Address listAddress = new Address();
            try
            {
                listAddress = packXprezObj.GetAddressByCustAddressId(custId,addId);
            }
            catch (Exception)
            {
                listAddress = null;
            }
            return Json(listAddress);
        }

        [HttpGet]
        public JsonResult GetCustomerId(string emailId)
        {
            int custId = 0;
            try
            {
                custId = packXprezObj.GetCustomerId(emailId);
            }
            catch (Exception)
            {
                custId = -99;
            }
            return Json(custId);
        }

        [HttpPost]
        public int RegisterCustomer(AddCustomer custObj)
        {
            bool status;
            int i;
            int t;
            try
            {
                i = packXprezObj.RegisteringCustomer(custObj.Name, custObj.Password, custObj.EmailId, custObj.ContactNo, custObj.BuildingNo, custObj.StreetNo, custObj.Locality, custObj.Pincode);
                if (i==1)
                {
                    status = true;
                    t = 1;
                }
                else
                {
                    status = false;
                    return i;
                }
            }
            catch (Exception)
            {
                t= -87;
                status = false;
            }
            return t;
        }

        [HttpPut]
        public bool UpdateDetails(SCustomer obj)
        {
            bool status = false;
            int i;
            try
            {
                i = packXprezObj.updateDetails(obj.Name, obj.Password, obj.EmailId, obj.ContactNo);
                if (i==1)
                {
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpPost]
        public bool AddAddress(SAddress obj)
        {
            bool status = false;
            int i;
            try
            {
                i = packXprezObj.AddAddress(obj.CustId, obj.BuildingNo, obj.StreetNo, obj.Locality, obj.Pincode);
                if (i==1)
                {
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpDelete]
        public bool RemoveAddress(decimal custId,decimal addId)
        {
            bool status = false;
            int i;
            try
            {
                i = packXprezObj.RemoveAddress(custId, addId);
                if (i==1)
                {
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpPut]
        public bool UpdateAddress(SAddress obj)
        {
            bool status;
            int i;
            try
            {
                i = packXprezObj.UpdateAddress(obj.CustId, obj.AddressId, obj.BuildingNo, obj.StreetNo, obj.Locality, obj.Pincode);
                if (i==1)
                {
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpPost]
        public JsonResult ValidateUser(SCustomer custObj)
        {
            
            string user;
            int role;
            try
            {
                role = packXprezObj.ValidateUser(custObj.EmailId,custObj.Password);
                switch (role)
                {
                    case 1:
                        user = "Customer";
                        break;
                    case 2:
                        user = "Branch Officer";
                        break;
                    case -1:
                        user = "invalid password";
                        break;
                    case -2:
                        user = "Email Id does not exists";
                        break;
                    default:
                        user = "Invalid";
                        break;

                }
            }
            catch
            {
                user = "Invalid User";
                role = -99;
            }
            return Json(user);
        }

        [HttpPost]
        public JsonResult checkService(SCheckService checkObj)
        {
            string msg="";
            int value;
            try {
                value = packXprezObj.checkAvailability(checkObj.From_Pin, checkObj.To_Pin);
                if (value == 1)
                {
                    msg = "Available";
                }
                else
                {
                    if (value == -1)
                    {
                        msg = "Delivery Not Available from Sender's Area";
                    }
                    else if(value==-2)
                    {
                        msg = "Delivery Not Available to Reciever's Area";
                    }
                    else
                    {
                        msg = "Some Error Occured!";
                    }
                   
                }
            }
            catch (Exception e)
            {
                msg = "Some Error occured";
            }
            return Json(msg);
        }

        [HttpPost]
        public bool PackageHistory(SPackage packObj)
        {

            bool status = false;
            try
            {
                int ret = packXprezObj.SchedulePickUp(packObj.CustId, packObj.BuildingNo, packObj.StreetNo, packObj.Locality, packObj.Pincode,packObj.ContactNo, packObj.FromAddress);
                if (ret == 1)
                {
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception ex)
            {
                status = false;
            }
            return status;
        }

        [HttpPost]
        public bool WalkInAddress(SWalkIn walkObj)
        {

            bool status = false;
            try
            {
                int ret = packXprezObj.WalkInAddress(walkObj.ToAddress,walkObj.FromAddress);
                if (ret == 1)
                {
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception ex)
            {
                status = false;
            }
            return status;
        }
        

        [HttpPut]
        public bool GenerateAWBNo(Mpackage packObj)
        {
            bool status = false;
            int i;
            try
            {
                i = packXprezObj.GenerateAWB(packObj.Tid);
                if (i==1)
                {
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpPut]
        public bool UpdateStatus(SStatus statusObj)
        {
            bool status = false;
            int res;
            try
            {
                res = packXprezObj.UpdateStatus(statusObj.TransactionId, statusObj.Value);
                if (res == 1)
                {
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch
            {
                status = false;
            }
            return status;      
        }

        [HttpGet]
        public JsonResult TrackStatus(decimal AwbNo)
        {
            string stat="";
            try
            {
                stat = packXprezObj.TrackStatus(AwbNo);
            }
            catch (Exception)
            {
                stat="Some Error occured";
            }
            return Json(stat);
        }

        [HttpGet]
        public JsonResult PackageHistory(int custId)
        {
            List<Package> lstPack = null;
            try
            {
                lstPack = packXprezObj.PackageHistory(custId);

            }
            catch (Exception)
            {

                lstPack = null;
            }
            return Json(lstPack);
        }

        [HttpPost]
        public bool CustFeedback(FeedBack feedObj)
        {
            bool status = false;
            int i;
            try
            {
                i = packXprezObj.CustomerFeedBack(feedObj.CustId, feedObj.FeedBackType, feedObj.Comments);
                if (i==1)
                {
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpGet]
        public JsonResult ManagePackage()
        {
            List<Package> lstPackMan = null;

            try
            {
                lstPackMan = packXprezObj.ManagePackage();
            }
            catch (Exception)
            {

                lstPackMan=null;
            }
            return Json(lstPackMan);
        }

        [HttpGet]
        public JsonResult GetButton(int tid)
        {
            string res = "";
            try
            {
                res = packXprezObj.GetButtons(tid);
            }
            catch (Exception)
            {

                res="error occured";
            }
            return Json(res);
        }

    }
}