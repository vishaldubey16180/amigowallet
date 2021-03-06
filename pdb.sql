USE [master]
GO
/****** Object:  Database [PackXprezDB]    Script Date: 1/12/2020 8:56:16 PM ******/
CREATE DATABASE [PackXprezDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'PackXprezDB', FILENAME = N'C:\Users\shubham.prasad01\PackXprezDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'PackXprezDB_log', FILENAME = N'C:\Users\shubham.prasad01\PackXprezDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [PackXprezDB] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [PackXprezDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [PackXprezDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [PackXprezDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [PackXprezDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [PackXprezDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [PackXprezDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [PackXprezDB] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [PackXprezDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [PackXprezDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [PackXprezDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [PackXprezDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [PackXprezDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [PackXprezDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [PackXprezDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [PackXprezDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [PackXprezDB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [PackXprezDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [PackXprezDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [PackXprezDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [PackXprezDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [PackXprezDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [PackXprezDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [PackXprezDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [PackXprezDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [PackXprezDB] SET  MULTI_USER 
GO
ALTER DATABASE [PackXprezDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [PackXprezDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [PackXprezDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [PackXprezDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [PackXprezDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [PackXprezDB] SET QUERY_STORE = OFF
GO
USE [PackXprezDB]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
USE [PackXprezDB]
GO
/****** Object:  UserDefinedFunction [dbo].[ufn_CheckAvailability]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[ufn_CheckAvailability](@from_pincode numeric(6),@to_pincode numeric(6))
RETURNS INT
AS
BEGIN
       declare @retVal int
	  
       IF EXISTS (SELECT *from Service where From_Pincode=@from_pincode and To_Pincode=@to_pincode)
              set @retVal=1
       else if not exists(select * from service where From_Pincode=@from_pincode)
              set @retVal=-1
		else if not exists(select * from service where To_Pincode=@to_pincode)
              set @retVal=-2
       return @retVal
end
GO
/****** Object:  UserDefinedFunction [dbo].[ufn_ConcatAddress]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE function [dbo].[ufn_ConcatAddress](
@buildingNo varchar(10),
@streetNo varchar(8),
@Locality varchar(20),
@Pincode numeric(6)
)
returns varchar(100)
as 
begin
declare @ret varchar(100)
set @ret=@buildingNo+', '+@streetNo+', '+cast(@Pincode as Varchar(6))+', '+@Locality
return @ret
end
GO
/****** Object:  UserDefinedFunction [dbo].[ufn_ConcatAddress2]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE function [dbo].[ufn_ConcatAddress2](
@buildingNo varchar(10),
@streetNo varchar(8),
@Locality varchar(20),
@Pincode numeric(6),
@contactNo numeric(10)
)
returns varchar(100)
as 
begin
declare @ret varchar(100)
set @ret=@buildingNo+', '+@streetNo+', '+cast(@Pincode as Varchar(6))+', '+@Locality+',	Contact Number: '+cast(@contactNo as varchar(10))
return @ret
end
GO
/****** Object:  UserDefinedFunction [dbo].[ufn_Login]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[ufn_Login](@emailId varchar(30),@password varchar(16))
RETURNS INT
AS
BEGIN
declare @role int
IF NOT EXISTS (SELECT RoleId from Customer where emailid=@emailId)
set @role=-2
else
	BEGIN
		IF EXISTS (SELECT RoleId from Customer where emailid=@emailId and Password!=@password)
		SET @role=-1
		ELSE IF NOT EXISTS (SELECT RoleId from Customer where emailid=@emailId and Password=@password)
		SET @role=0
		ELSE
		set @role=(SELECT RoleId from Customer where emailid=@emailId and Password=@password)
	END
 return @role
 end
GO
/****** Object:  UserDefinedFunction [dbo].[ufn_TrackStatus]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[ufn_TrackStatus](@AWBNo numeric(12))
RETURNS varchar(25)
AS
BEGIN
	declare @retVal varchar(25)
	IF EXISTS (SELECT * from Package where AWBNo=@AWBNo)
		set @retVal=(Select status from Package where AWBNo=@AWBNo)
	else
		set @retVal='Invalid AWB Number'
	 return @retVal
 end
GO
/****** Object:  Table [dbo].[Address]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Address](
	[CustId] [int] NOT NULL,
	[BuildingNo] [varchar](10) NOT NULL,
	[StreetNo] [varchar](10) NOT NULL,
	[Locality] [varchar](25) NOT NULL,
	[Pincode] [numeric](6, 0) NOT NULL,
	[AddressId] [int] NULL,
 CONSTRAINT [pk_Address] PRIMARY KEY CLUSTERED 
(
	[CustId] ASC,
	[BuildingNo] ASC,
	[StreetNo] ASC,
	[Locality] ASC,
	[Pincode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[CustId] [int] IDENTITY(10000,1) NOT NULL,
	[Name] [varchar](30) NULL,
	[Password] [varchar](16) NOT NULL,
	[EmailId] [varchar](40) NOT NULL,
	[ContactNo] [numeric](10, 0) NULL,
	[RoleId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[CustId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[EmailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FeedBack]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FeedBack](
	[S_No] [int] IDENTITY(1,1) NOT NULL,
	[CustId] [int] NULL,
	[FeedBack Type] [varchar](15) NULL,
	[Comments] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[S_No] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GenerateAWB]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GenerateAWB](
	[TID] [numeric](12, 0) NULL,
	[AWBNumber] [numeric](12, 0) IDENTITY(1234567890,2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[AWBNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Package]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Package](
	[CustId] [int] NULL,
	[AWBNo] [numeric](10, 0) NULL,
	[TID] [int] IDENTITY(11111,1) NOT NULL,
	[fromAddress] [varchar](100) NULL,
	[toAddress] [varchar](100) NULL,
	[status] [varchar](25) NULL,
PRIMARY KEY CLUSTERED 
(
	[TID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PackageManagement]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PackageManagement](
	[CustId] [int] NULL,
	[TransactionId] [int] NOT NULL,
	[AWBNo] [numeric](12, 0) NULL,
	[CustomerName] [varchar](30) NULL,
	[FromLocation] [varchar](100) NULL,
	[ToAddress] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[TransactionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[RoleId] [int] NOT NULL,
	[RoleName] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Service]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Service](
	[From_Pincode] [numeric](6, 0) NOT NULL,
	[To_Pincode] [numeric](6, 0) NOT NULL,
 CONSTRAINT [pk_code] PRIMARY KEY CLUSTERED 
(
	[From_Pincode] ASC,
	[To_Pincode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Address]  WITH CHECK ADD FOREIGN KEY([CustId])
REFERENCES [dbo].[Customer] ([CustId])
GO
ALTER TABLE [dbo].[Customer]  WITH CHECK ADD FOREIGN KEY([RoleId])
REFERENCES [dbo].[Role] ([RoleId])
GO
ALTER TABLE [dbo].[FeedBack]  WITH CHECK ADD FOREIGN KEY([CustId])
REFERENCES [dbo].[Customer] ([CustId])
GO
ALTER TABLE [dbo].[Package]  WITH CHECK ADD FOREIGN KEY([CustId])
REFERENCES [dbo].[Customer] ([CustId])
GO
ALTER TABLE [dbo].[PackageManagement]  WITH CHECK ADD FOREIGN KEY([CustId])
REFERENCES [dbo].[Customer] ([CustId])
GO
ALTER TABLE [dbo].[PackageManagement]  WITH CHECK ADD FOREIGN KEY([TransactionId])
REFERENCES [dbo].[Package] ([TID])
GO
/****** Object:  StoredProcedure [dbo].[usp_AddAddress]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_AddAddress](
@emailId varchar(40),
@buildingNo varchar(10),
@streetNo varchar(10),
@locality varchar(25),
@pincode numeric(6)
)
AS
BEGIN
	DECLARE @CustId int,@AId int 
	BEGIN TRY
		IF NOT EXISTS(SELECT EmailId from customer where EmailId=@emailId)
			return -1
		else IF (LEN(@pincode)!=6)
			RETURN -2
		else
			begin
				set @CustId=(select custId from customer where EmailId=@emailId)
				if exists(select AddressID from [Address] where CustId=@CustId)
					set @AId=(select Max(AddressID) from [Address] where CustId=@CustId)
				else
					set @AId=1
				INSERT INTO Address VALUES (@CustId,@buildingNo,@streetNo,@locality,@pincode,@AId+1)
			return 1;
			end
	END TRY
	BEGIN CATCH
		SELECT ERROR_LINE() AS [LINE],
		ERROR_MESSAGE() AS [MESSAGE],
		ERROR_STATE() AS [STATE]
		return 0;
	END CATCH
	END
GO
/****** Object:  StoredProcedure [dbo].[usp_Feedback]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[usp_Feedback](
@custId int,
@feedbackType varchar(20),
@comments varchar(100)
)
as begin
begin try
if not exists(select tid from Package where CustId=@custId)
return -1
insert into FeedBack values(@custId,@feedbackType,@comments)
return 1
end try
begin catch
return -99
end catch
end
GO
/****** Object:  StoredProcedure [dbo].[usp_GenerateAwbno]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[usp_GenerateAwbno](
@TransactionId numeric(12)
)
as
begin
begin try
declare @AWBno numeric(12)

insert into GenerateAWB values(@TransactionId)
set @AWBno=(select AWBNumber from GenerateAWB where TID=@TransactionId)
update package set AWBNo=@AWBno, status='Picked' where TID=@TransactionId
update PackageManagement set AWBNo=@AWBno where TransactionId=@TransactionId
return 1
end try
begin catch
return -66
end catch
end
GO
/****** Object:  StoredProcedure [dbo].[usp_ManagePackage]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[usp_ManagePackage](
@custId numeric,
@CustomerName varchar(20),
@buildingNo varchar(10),
@streetNo varchar(8),
@Locality varchar(20),
@pincode numeric(6),
@FromLocation varchar(100)
)
as
begin
declare @toAddress varchar(100),@AwbNo numeric(12)
begin try
exec @toAddress= ufn_ConcatAddress @buildingNo,@streetNo,@Locality,@pincode
set @AwbNo=(select max(AWBNumber) from GenerateAWB)
insert into PackageManagement values(@custId,@AwbNo,@CustomerName,@FromLocation,@toAddress)
return 1
end try
begin catch
return -66;
end catch
end
GO
/****** Object:  StoredProcedure [dbo].[usp_Registration]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_Registration](
@name varchar(30),
@password varchar(16),
@emailId varchar(40),
@contactNo numeric(10),
@buildingNo varchar(10),
@streetNo varchar(10),
@locality varchar(25),
@pincode numeric(6)
)
AS
BEGIN
DECLARE @OutRes int,@CustId int
BEGIN TRY
	IF (LEN(@password)<8 OR LEN(@password)>16 OR (@password IS NULL))
	RETURN -1
	IF (LEN(@contactNo)!=10)
	RETURN -2
	IF (LEN(@pincode)!=6)
	RETURN -3
	INSERT INTO CUSTOMER VALUES(@name,@password,@emailId,@contactNo,1);
	SET @CustId=(select max(CustId) from Customer)
	INSERT INTO Address VALUES (@CustId,@buildingNo,@streetNo,@locality,@pincode)
	return 1;

END TRY
BEGIN CATCH
	SELECT ERROR_LINE() AS [LINE],
	ERROR_MESSAGE() AS [MESSAGE],
	ERROR_STATE() AS [STATE]
	return 0;
END CATCH

END
GO
/****** Object:  StoredProcedure [dbo].[usp_RemoveAddress]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_RemoveAddress](
@emailId varchar(40),
@buildingNo varchar(10),
@streetNo varchar(10),
@locality varchar(25),
@pincode numeric(6))
AS
BEGIN
	DECLARE @CustId int
	BEGIN TRY
		IF NOT EXISTS(SELECT EmailId from customer where EmailId=@emailId)
			return -1
		else
			begin
				set @CustId=(select custId from customer where EmailId=@emailId)
				delete from Address where custId=@CustId and (BuildingNo=@buildingNo 
				and StreetNo=@streetNo
				and Locality=@locality
				and Pincode=@pincode)
				return 1;
			end
	END TRY
	BEGIN CATCH
		SELECT ERROR_LINE() AS [LINE],
		ERROR_MESSAGE() AS [MESSAGE],
		ERROR_STATE() AS [STATE]
		return 0;
	END CATCH
	END
GO
/****** Object:  StoredProcedure [dbo].[usp_Schedule]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Procedure [dbo].[usp_Schedule](
@custId int,
@buildingNo varchar(10),
@streetNo varchar(8),
@Locality varchar(20),
@pincode numeric(6),
@fromAddress varchar(100))
as 
begin
declare @toAddress varchar(100),@custName varchar(30),@tid numeric(12)
begin try
exec @toAddress= ufn_ConcatAddress @buildingNo,@streetNo,@Locality,@pincode
insert into Package values (@custId,NULL,@fromAddress,@toAddress,'Waiting')
set @custName=(select [Name] from Customer where CustId=@custId)
set @tid=(select max(TID) from Package)

insert into PackageManagement (CustId,TransactionId,CustomerName,FromLocation,ToAddress) values (@custId,@tid,@custName,@fromAddress,@toAddress)

return 1
end try
begin catch
return -99;
end catch
end
GO
/****** Object:  StoredProcedure [dbo].[usp_Schedule2]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Procedure [dbo].[usp_Schedule2](
@custId int,
@buildingNo varchar(10),
@streetNo varchar(8),
@Locality varchar(20),
@pincode numeric(6),
@contactNo numeric(10),
@fromAddress varchar(100))
as 
begin
declare @toAddress varchar(100),@custName varchar(30),@tid numeric(12)
begin try
exec @toAddress= ufn_ConcatAddress2 @buildingNo,@streetNo,@Locality,@pincode,@contactNo
insert into Package values (@custId,NULL,@fromAddress,@toAddress,'Waiting')
set @custName=(select [Name] from Customer where CustId=@custId)
set @tid=(select max(TID) from Package)

insert into PackageManagement (CustId,TransactionId,CustomerName,FromLocation,ToAddress) values (@custId,@tid,@custName,@fromAddress,@toAddress)

return 1
end try
begin catch
select ERROR_MESSAGE()
select ERROR_LINE()
select @fromAddress
select len(@toAddress)
return -99;
end catch
end
GO
/****** Object:  StoredProcedure [dbo].[usp_Schedule3]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create Procedure [dbo].[usp_Schedule3](
@toAddress varchar(100),
@fromAddress varchar(100))
as 
begin
declare @tid numeric(12)
begin try
insert into Package values (null,NULL,@fromAddress,@toAddress,'Picked')
set @tid=(select max(TID) from Package)

insert into PackageManagement (CustId,TransactionId,CustomerName,FromLocation,ToAddress) values (null,@tid,null,@fromAddress,@toAddress)

return 1
end try
begin catch
return -99;
end catch
end
GO
/****** Object:  StoredProcedure [dbo].[usp_UpdateAddress]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_UpdateAddress](
@custId int,
@AddId int,
@buildingNo varchar(10),
@streetNo varchar(10),
@locality varchar(25),
@pincode numeric(6)
)
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS(SELECT CustId from customer where CustId=@custId)
			return -1
		else if not exists (SELECT *from Address where CustId=@custId and AddressId=@AddId)
			return -2
		else IF (LEN(@pincode)!=6)
			RETURN -3
		else
			begin
				UPDATE Address set BuildingNo=@buildingNo,StreetNo=@streetNo,Locality=@locality,Pincode=@pincode
				where CustId=@custId and AddressId=@AddId
				return 1
			end
	END TRY
	BEGIN CATCH
		SELECT ERROR_LINE() AS [LINE],
		ERROR_MESSAGE() AS [MESSAGE],
		ERROR_STATE() AS [STATE]
		return 0;
	END CATCH
	END
GO
/****** Object:  StoredProcedure [dbo].[usp_UpdateDetails]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_UpdateDetails](
@name varchar(30),
@password varchar(16),
@emailId varchar(40),
@contactNo numeric(10)
)
AS
BEGIN
DECLARE @CustId int
BEGIN TRY
	set @CustId=0
	set @CustId=(select CustId from Customer where EmailId=@emailId)
	IF @CustId=0
	RETURN -1
	else IF (LEN(@contactNo)!=10)
	RETURN -2
	else
		begin
			update CUSTOMER 
			set [Name]=@name,
			[Password]=@password,
			ContactNo=@contactNo
			where CustId=@CustId
			return 1;
		end
END TRY
BEGIN CATCH
	SELECT ERROR_LINE() AS [LINE],
	ERROR_MESSAGE() AS [MESSAGE],
	ERROR_STATE() AS [STATE]
	return 0;
END CATCH

END
GO
/****** Object:  StoredProcedure [dbo].[usp_UpdateStatus]    Script Date: 1/12/2020 8:56:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[usp_UpdateStatus](
@tid numeric(12),
@value varchar(25)
)
as
Begin
begin try
update Package set status=@value where TID=@tid
return 1
end try
begin catch
return -99
end catch
end
GO
USE [master]
GO
ALTER DATABASE [PackXprezDB] SET  READ_WRITE 
GO
