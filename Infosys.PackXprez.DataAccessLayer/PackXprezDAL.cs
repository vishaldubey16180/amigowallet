using Infosys.PackXprez.DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;

namespace Infosys.PackXprez.DataAccessLayer
{
    public class PackXprezDAL
    {
        PackXprezDBContext context;

        public PackXprezDAL()
        {
            context = new PackXprezDBContext();
        }

        public int GetCustomerId(string emailId)
        {
            int retVal = 0;
            retVal= context.Customer.Where(x => x.EmailId == emailId).Select(y => y.CustId).FirstOrDefault();
            return retVal;
        }

        public Customer GetCustomers(int custId)
        {
            Customer Customer = context.Customer.Where(x=>x.CustId==custId).FirstOrDefault();
            return Customer;
        }

        public List<Address> GetAddressByCustId(int customerId)
        {
            List<Address> listOfaddress = context.Address.Where(x => x.CustId == customerId).ToList();
            return listOfaddress;
        }

        public Address GetAddressByCustAddressId(int customerId,int addressId)
        {
            Address address = context.Address.Where(x => x.CustId == customerId && x.AddressId==addressId).FirstOrDefault();
            return address;
        }

        public int RegisteringCustomer(string custName, string password, string mailid, decimal? contactNo, string buildingNo, string streetNo, string locality, decimal pincode)
        {
            int res;
            int ret = 0;
            try
            {
                SqlParameter prmCustName = new SqlParameter("@name", custName);
                SqlParameter prmPassword = new SqlParameter("@password", password);
                SqlParameter prmMailId = new SqlParameter("@emailId", mailid);
                SqlParameter prmContactNo = new SqlParameter("@contactNo", contactNo);
                SqlParameter prmBuildingNo = new SqlParameter("@buildingNo", buildingNo);
                SqlParameter prmStreetNo = new SqlParameter("@streetNo", streetNo);
                SqlParameter prmLocality = new SqlParameter("@locality", locality);
                SqlParameter prmPincode = new SqlParameter("@pincode", pincode);
                SqlParameter prmReturnVal = new SqlParameter("@ret", System.Data.SqlDbType.TinyInt);
                prmReturnVal.Direction = System.Data.ParameterDirection.Output;

                res = context.Database.ExecuteSqlCommand("EXEC @ret=dbo.usp_Registration @name,@password,@emailId,@contactNo,@buildingNo,@streetNo,@locality,@pincode", new[] { prmReturnVal, prmCustName, prmPassword, prmMailId, prmContactNo, prmBuildingNo, prmStreetNo, prmLocality, prmPincode });
                ret = Convert.ToInt32(prmReturnVal.Value);

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                ret = -99;
            }
            return ret;
        }

        public int updateDetails(string custName, string password, string emailid, decimal? contactNo)
        {
            int res;
            int ret = 0;
            try
            {
                SqlParameter prmCustName = new SqlParameter("@name", custName);
                SqlParameter prmPassword = new SqlParameter("@password", password);
                SqlParameter prmMailId = new SqlParameter("@emailId", emailid);
                SqlParameter prmContactNo = new SqlParameter("@contactNo", contactNo);
                SqlParameter prmReturnVal = new SqlParameter("@ret", System.Data.SqlDbType.TinyInt);
                prmReturnVal.Direction = System.Data.ParameterDirection.Output;

                res = context.Database.ExecuteSqlCommand("EXEC @ret=dbo.usp_UpdateDetails @name,@password,@emailId,@contactNo", new[] { prmReturnVal, prmCustName, prmPassword, prmMailId, prmContactNo });
                ret = Convert.ToInt32(prmReturnVal.Value);
            }
            catch (Exception)
            {
                ret = -99;
            }
            return ret;
        }

        public int AddAddress(decimal custId, string buildingNo, string streetNo, string locality, decimal pincode)
        {
            int res;
            int ret;
            try
            {
                SqlParameter prmMailId = new SqlParameter("@custId", custId);
                SqlParameter prmBuildingNo = new SqlParameter("@buildingNo", buildingNo);
                SqlParameter prmStreetNo = new SqlParameter("@streetNo", streetNo);
                SqlParameter prmLocality = new SqlParameter("@locality", locality);
                SqlParameter prmPincode = new SqlParameter("@pincode", pincode);
                SqlParameter prmReturnVal = new SqlParameter("@ret", System.Data.SqlDbType.TinyInt);
                prmReturnVal.Direction = System.Data.ParameterDirection.Output;

                res = context.Database.ExecuteSqlCommand("EXEC @ret=dbo.usp_AddAddress @custId,@buildingNo,@streetNo,@locality,@pincode", new[] { prmReturnVal, prmMailId, prmBuildingNo, prmStreetNo, prmLocality, prmPincode });
                ret = Convert.ToInt32(prmReturnVal.Value);
            }
            catch (Exception)
            {
                ret = -99;
            }
            return ret;
        }

        public int RemoveAddress(decimal custId, decimal addressId)
        {
            int res;
            int ret;
            try
            {
                SqlParameter prmCustId = new SqlParameter("@custId", custId);
                SqlParameter prmAddId = new SqlParameter("@AddId", addressId);
                SqlParameter prmReturnVal = new SqlParameter("@ret", System.Data.SqlDbType.TinyInt);
                prmReturnVal.Direction = System.Data.ParameterDirection.Output;

                res = context.Database.ExecuteSqlCommand("EXEC @ret=dbo.usp_RemoveAddress @custId,@AddId", new[] { prmReturnVal, prmCustId, prmAddId });
                ret = Convert.ToInt32(prmReturnVal.Value);
            }
            catch (Exception)
            {
                ret = -99;
            }
            return ret;
        }

        public int UpdateAddress(int custId,int? addId,string buildingNo, string streetNo, string locality, decimal pincode)
        {
            int res;
            int ret;
            try
            {
                SqlParameter prmCustId = new SqlParameter("@custId", custId);
                SqlParameter prmAddId = new SqlParameter("@AddId", addId);
                SqlParameter prmBuildingNo = new SqlParameter("@buildingNo", buildingNo);
                SqlParameter prmStreetNo = new SqlParameter("@streetNo", streetNo);
                SqlParameter prmLocality = new SqlParameter("@locality", locality);
                SqlParameter prmPincode = new SqlParameter("@pincode", pincode);
                SqlParameter prmReturnVal = new SqlParameter("@ret", System.Data.SqlDbType.TinyInt);
                prmReturnVal.Direction = System.Data.ParameterDirection.Output;

                res = context.Database.ExecuteSqlCommand("EXEC @ret=dbo.usp_UpdateAddress @custId,@AddId,@buildingNo,@streetNo,@locality,@pincode", new[] { prmReturnVal, prmCustId,prmAddId, prmBuildingNo, prmStreetNo, prmLocality, prmPincode });
                ret = Convert.ToInt32(prmReturnVal.Value);
            }
            catch (Exception)
            {
                ret = -99;
            }
            return ret;
        }

        public int ValidateUser(string emailId, string password)
        {
            int roleId;
            try
            {
                roleId = (from role in context.Customer select PackXprezDBContext.LoginUser(emailId, password)).FirstOrDefault();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                roleId = -98;
            }
            return roleId;
        }

        public int checkAvailability(decimal From_Pincode, decimal To_Pincode)
        {
            int value = 0;
            try
            {
                value = (from v in context.Service select PackXprezDBContext.CheckService(From_Pincode, To_Pincode)).FirstOrDefault();
            }
            catch (Exception e)
            {
                value = -98;
            }

            return value;
        }

        public int SchedulePackage(int custId, string buildingNo, string streetNo, string locality, decimal pincode, string fromAddress)
        {
            int res;
            int ret;
            try
            {
                SqlParameter prmCustId = new SqlParameter("@custId", custId);
                SqlParameter prmBuildingNo = new SqlParameter("@buildingNo", buildingNo);
                SqlParameter prmStreetNo = new SqlParameter("@streetNo", streetNo);
                SqlParameter prmLocality = new SqlParameter("@locality", locality);
                SqlParameter prmPincode = new SqlParameter("@pincode", pincode);
                SqlParameter prmFromAddress = new SqlParameter("@fromAddress", fromAddress);
                SqlParameter prmReturnVal = new SqlParameter("@ret", System.Data.SqlDbType.TinyInt);
                prmReturnVal.Direction = System.Data.ParameterDirection.Output; ;

                res = context.Database.ExecuteSqlCommand("EXEC @ret=dbo.usp_Schedule @custId,@buildingNo,@streetNo,@locality,@pincode,@fromAddress",
                    new[] { prmReturnVal, prmCustId, prmBuildingNo, prmStreetNo, prmLocality, prmPincode, prmFromAddress });
                ret = Convert.ToInt32(prmReturnVal.Value);
            }
            catch (Exception ex)
            {
                ret = -99;
            }
            return ret;
        }

        public int SchedulePickUp(int custId, string buildingNo, string streetNo, string locality, decimal pincode, decimal conNumber, string fromAddress)
        {
            int res;
            int ret;
            try
            {
                SqlParameter prmCustId = new SqlParameter("@custId", custId);
                SqlParameter prmBuildingNo = new SqlParameter("@buildingNo", buildingNo);
                SqlParameter prmStreetNo = new SqlParameter("@streetNo", streetNo);
                SqlParameter prmLocality = new SqlParameter("@locality", locality);
                SqlParameter prmPincode = new SqlParameter("@pincode", pincode);
                SqlParameter prmConNumber = new SqlParameter("@contactNo", conNumber);
                SqlParameter prmFromAddress = new SqlParameter("@fromAddress", fromAddress);
                SqlParameter prmReturnVal = new SqlParameter("@ret", System.Data.SqlDbType.TinyInt);
                prmReturnVal.Direction = System.Data.ParameterDirection.Output; ;

                res = context.Database.ExecuteSqlCommand("EXEC @ret=dbo.usp_Schedule2 @custId,@buildingNo,@streetNo,@locality,@pincode,@contactNo,@fromAddress",
                    new[] { prmReturnVal, prmCustId, prmBuildingNo, prmStreetNo, prmLocality, prmPincode, prmConNumber, prmFromAddress });
                ret = Convert.ToInt32(prmReturnVal.Value);
            }
            catch (Exception ex)
            {
                ret = -99;
            }
            return ret;
        }

        public int WalkInAddress(string toAddress, string fromAddress)
        {
            int res;
            int ret;
            try { 
                SqlParameter prmToAddress = new SqlParameter("@toAddress", toAddress);
                SqlParameter prmFromAddress = new SqlParameter("@fromAddress", fromAddress);
                SqlParameter prmReturnVal = new SqlParameter("@ret", System.Data.SqlDbType.TinyInt);
                prmReturnVal.Direction = System.Data.ParameterDirection.Output; ;

                res = context.Database.ExecuteSqlCommand("EXEC @ret=dbo.usp_Schedule3 @toAddress,@fromAddress",
                    new[] { prmReturnVal, prmToAddress, prmFromAddress });
                ret = Convert.ToInt32(prmReturnVal.Value);
            }
            catch (Exception ex)
            {
                ret = -99;
            }
            return ret;
        }

        public int GenerateAWB(int transactionId)
        {
            int res;
            int ret;
            try
            {
                SqlParameter prmTransactionId = new SqlParameter("@TransactionId", transactionId);
                SqlParameter prmReturnVal = new SqlParameter("@ret", System.Data.SqlDbType.TinyInt);
                prmReturnVal.Direction = System.Data.ParameterDirection.Output;

                res = context.Database.ExecuteSqlCommand("EXEC @ret=dbo.usp_GenerateAwbno @TransactionId", new[] { prmReturnVal,prmTransactionId });
                ret = Convert.ToInt32(prmReturnVal.Value);

            }
            catch (Exception)
            {
                ret = -99;
            }
            return ret;
        }

        public int UpdateStatus(int tid,string value)
        {
            int res;
            int ret;
            try
            {
                SqlParameter prmTid = new SqlParameter("@tid", tid);
                SqlParameter prmValue = new SqlParameter("@value", value);
                SqlParameter prmReturnVal = new SqlParameter("@ret", System.Data.SqlDbType.TinyInt);
                prmReturnVal.Direction = System.Data.ParameterDirection.Output;

                res = context.Database.ExecuteSqlCommand("EXEC @ret=dbo.usp_UpdateStatus @tid,@value", new[] { prmReturnVal, prmTid, prmValue });
                ret = Convert.ToInt32(prmReturnVal.Value);

            }
            catch (Exception)
            {
                ret = -99;
            }
            return ret;

        }

        public string TrackStatus(decimal AwbNo)
        {
            string res = "";
            try
            {
                res = (from stat in context.Package select PackXprezDBContext.TrackStatus(AwbNo)).FirstOrDefault();
            }
            catch (Exception)
            {

                res="Some Error Occured";
            }
            return res;
        }

        public List<Package> PackageHistory(int custId)
        {
            List<Package> lstPack = null;
            try
            {
                lstPack = (context.Package.Where(p => p.CustId == custId).ToList());
                //lstPack = (from p in context.Package where p.CustId == custId select p).ToList();
            }
            catch (Exception)
            {

                lstPack=null;
            }
            return lstPack;
        }

        public int CustomerFeedBack(int? custId, string feedbackType, string comment)
        {
            int res;
            int ret;
            try
            {
                SqlParameter prmCustId = new SqlParameter("@custId", custId);
                SqlParameter prmFeedbackType = new SqlParameter("@feedbackType", feedbackType);
                SqlParameter prmComments = new SqlParameter("@comments", comment);
                SqlParameter prmReturnVal = new SqlParameter("@ret", System.Data.SqlDbType.TinyInt);
                prmReturnVal.Direction = System.Data.ParameterDirection.Output;

                res = context.Database.ExecuteSqlCommand("EXEC @ret=dbo.usp_Feedback @custId,@feedbackType,@comments", new[] { prmReturnVal, prmCustId, prmFeedbackType, prmComments });
                ret = Convert.ToInt32(prmReturnVal.Value);
            }
            catch (Exception)
            {
                ret = -99;
            }
            return ret;
        }

        public List<Package> ManagePackage()
        {
            List<Package> lstPackMan = null;
            try
            {
                lstPackMan = (context.Package.Select(x => x)).ToList();
            }
            catch (Exception)
            {

                lstPackMan = null;
            }

            return lstPackMan;
        }

        public string GetButtons(int tid)
        {
            string res = "";
            try
            {
                res = (context.Package.Where(x => x.Tid == tid).Select(x => x.Status)).FirstOrDefault();
            }
            catch (Exception)
            {

                res = "Error Occured";
            }
            return res;
        }

       
        }
        

    }
