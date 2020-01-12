namespace Infosys.PackXprez.WebService.Model
{
    public class SAddress
    {

        public int CustId { get; set; }
        public int AddressId { get; set; }
        public string BuildingNo { get; set; }
        public string StreetNo { get; set; }
        public string Locality { get; set; }
        public decimal Pincode { get; set; }
    }
}