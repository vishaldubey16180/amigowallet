namespace Infosys.PackXprez.WebService.Model
{
    public class AddCustomer
    {

        //public int CustId { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string EmailId { get; set; }
        public decimal? ContactNo { get; set; }
        public string BuildingNo { get; set; }
        public string StreetNo { get; set; }
        public string Locality { get; set; }
        public decimal Pincode { get; set; }
    }
}
