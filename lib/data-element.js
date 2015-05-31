var FIXED_LENGTH = false;
var VARIABLE_LENGTH = true;

var dataElement = {
  1   : ['b',   16,  FIXED_LENGTH],           //Bit Map Extended
	2   : ['an',  19,  VARIABLE_LENGTH],        //Primary account number (PAN
	3   : ['n',   6,   FIXED_LENGTH],           //Precessing code
	4   : ['n',   12,  FIXED_LENGTH],           //Amount transaction
  5   : ['n',   12,  FIXED_LENGTH],           //Amount reconciliation
	6   : ['n',   12,  FIXED_LENGTH],           //Amount cardholder billing
	7   : ['an',  10,  FIXED_LENGTH],           //Date and time transmission
	8   : ['n',   8,   FIXED_LENGTH],           //Amount cardholder billing fee
	9   : ['n',   8,   FIXED_LENGTH],           //Conversion rate reconciliation
	10  : ['n',   8,   FIXED_LENGTH],           //Conversion rate cardholder billing
	11  : ['n',   6,   FIXED_LENGTH],           //Systems trace audit number
	12  : ['n',   6,   FIXED_LENGTH],           //Date and time local transaction
	13  : ['n',   4,   FIXED_LENGTH],           //Date effective
	14  : ['n',   4,   FIXED_LENGTH],           //Date expiration
	15  : ['n',   4,   FIXED_LENGTH],           //Date settlement
	16  : ['n',   4,   FIXED_LENGTH],           //Date conversion
	17  : ['n',   4,   FIXED_LENGTH],           //Date capture
	18  : ['n',   4,   FIXED_LENGTH],           //Message error indicator
	19  : ['n',   3,   FIXED_LENGTH],           //Country code acquiring institution
	20  : ['n',   3,   FIXED_LENGTH],           //Country code primary account number (PAN
	21  : ['n',   3,   FIXED_LENGTH],           //Transaction life cycle identification data
	22  : ['n',   3,   FIXED_LENGTH],           //Point of service data code
	23  : ['n',   3,   FIXED_LENGTH],           //Card sequence number
	24  : ['n',   3,   FIXED_LENGTH],           //Function code
	25  : ['n',   2,   FIXED_LENGTH],           //Message reason code
	26  : ['n',   2,   FIXED_LENGTH],           //Merchant category code
	27  : ['n',   1,   FIXED_LENGTH],           //Point of service capability
	28  : ['n',   8,   FIXED_LENGTH],           //Date reconciliation
	29  : ['an',  9,   FIXED_LENGTH],           //Reconciliation indicator
	30  : ['n',   8,   FIXED_LENGTH],           //Amounts original
	31  : ['an',  9,   FIXED_LENGTH],           //Acquirer reference number
	32  : ['n',   11,  VARIABLE_LENGTH],        //Acquiring institution identification code
	33  : ['n',   11,  VARIABLE_LENGTH],        //Forwarding institution identification code
	34  : ['an',  28,  VARIABLE_LENGTH],        //Electronic commerce data
	35  : ['z',   37,  VARIABLE_LENGTH],        //Track 2 data
	36  : ['n',   104, VARIABLE_LENGTH],        //Track 3 data
	37  : ['an',  12,  FIXED_LENGTH],           //Retrieval reference number
	38  : ['an',  6,   FIXED_LENGTH],           //Approval code
	39  : ['an',  2,   FIXED_LENGTH],           //Action code
	40  : ['an',  3,   FIXED_LENGTH],           //Service code
	41  : ['ans', 8,   FIXED_LENGTH],           //Card acceptor terminal identification
	42  : ['ans', 15,  FIXED_LENGTH],           //Card acceptor identification code
	43  : ['ans', 40,  FIXED_LENGTH],           //Card acceptor name/location
	44  : ['an',  25,  VARIABLE_LENGTH],        //Additional response data
	45  : ['an',  76,  VARIABLE_LENGTH],        //Track 1 data
	46  : ['an',  999, VARIABLE_LENGTH],        //Amounts fees
	47  : ['an',  999, VARIABLE_LENGTH],        //Additional data national
	48  : ['ans', 119, VARIABLE_LENGTH],        //Additional data private
	49  : ['an',  3,   FIXED_LENGTH],           //Verification data
	50  : ['an',  3,   FIXED_LENGTH],           //Currency code, settlement
	51  : ['a',   3,   FIXED_LENGTH],           //Currency code, cardholder billing
	52  : ['an',  16,  FIXED_LENGTH],           //Personal identification number (PIN) data
	53  : ['an',  18,  FIXED_LENGTH],           //Security related control information
	54  : ['an',  120, FIXED_LENGTH],           //Amounts additional
	55  : ['ans', 999, VARIABLE_LENGTH],        //Integrated circuit card (ICC) system related data
	56  : ['ans', 999, VARIABLE_LENGTH],        //Original data elements
	57  : ['ans', 999, VARIABLE_LENGTH],        //Authorisation life cycle code
	58  : ['ans', 999, VARIABLE_LENGTH],        //Authorising agent institution identification code
	59  : ['ans', 99,  VARIABLE_LENGTH],        //Transport data
	60  : ['ans', 60,  VARIABLE_LENGTH],        //Reserved for national use
	61  : ['ans', 99,  VARIABLE_LENGTH],        //Reserved for national use
	62  : ['ans', 999, VARIABLE_LENGTH],        //Reserved for private use
	63  : ['ans', 999, VARIABLE_LENGTH],        //Reserved for private use
	64  : ['b',   16,  FIXED_LENGTH],           //Message authentication code (MAC) field
	65  : ['b',   16,  FIXED_LENGTH],           //Bitmap tertiary
	66  : ['n',   1,   FIXED_LENGTH],           //Settlement code
	67  : ['n',   2,   FIXED_LENGTH],           //Extended payment data
	68  : ['n',   3,   FIXED_LENGTH],           //Receiving institution country code
	69  : ['n',   3,   FIXED_LENGTH],           //Settlement institution county code
	70  : ['n',   3,   FIXED_LENGTH],           //Network management Information code
	71  : ['n',   4,   FIXED_LENGTH],           //Message number
	72  : ['ans', 999, VARIABLE_LENGTH],        //Data record
	73  : ['n',   6,   FIXED_LENGTH],           //Date action
	74  : ['n',   10,  FIXED_LENGTH],           //Credits, number
	75  : ['n',   10,  FIXED_LENGTH],           //Credits, reversal number
	76  : ['n',   10,  FIXED_LENGTH],           //Debits, number
	77  : ['n',   10,  FIXED_LENGTH],           //Debits, reversal number
	78  : ['n',   10,  FIXED_LENGTH],           //Transfer number
	79  : ['n',   10,  FIXED_LENGTH],           //Transfer, reversal number
	80  : ['n',   10,  FIXED_LENGTH],           //Inquiries number
	81  : ['n',   10,  FIXED_LENGTH],           //Authorizations, number
	82  : ['n',   12,  FIXED_LENGTH],           //Credits, processing fee amount
	83  : ['n',   12,  FIXED_LENGTH],           //Credits, transaction fee amount
	84  : ['n',   12,  FIXED_LENGTH],           //Debits, processing fee amount
	85  : ['n',   12,  FIXED_LENGTH],           //Debits, transaction fee amount
	86  : ['n',   15,  FIXED_LENGTH],           //Credits, amount
	87  : ['an',   16, FIXED_LENGTH],           //Credits, reversal amount
	88  : ['n',   16,  FIXED_LENGTH],           //Debits, amount
	89  : ['n',   16,  FIXED_LENGTH],           //Debits, reversal amount
	90  : ['an',  42,  FIXED_LENGTH],           //Original data elements
	91  : ['an',  1,   FIXED_LENGTH],           //File update code
	92  : ['n',   2,   FIXED_LENGTH],           //File security code
	93  : ['n',   5,   FIXED_LENGTH],           //Response indicator
	94  : ['an',  7,   FIXED_LENGTH],           //Service indicator
	95  : ['an',  42,  FIXED_LENGTH],           //Replacement amounts
	96  : ['an',  8,   FIXED_LENGTH],           //Message security code
	97  : ['an',  17,  FIXED_LENGTH],           //Amount, net settlement
	98  : ['ans', 25,  FIXED_LENGTH],           //Payee
	99  : ['n',   11,  VARIABLE_LENGTH],        //Settlement institution identification code
	100 : ['n',   11,  VARIABLE_LENGTH],        //Receiving institution identification code
	101 : ['ans', 17,  FIXED_LENGTH],           //File name
	102 : ['ans', 28,  VARIABLE_LENGTH],        //Account identification 1
	103 : ['ans', 28,  VARIABLE_LENGTH],        //Account identification 2
	104 : ['an',  99,  VARIABLE_LENGTH],        //Transaction description
	105 : ['ans', 999, VARIABLE_LENGTH],        //Reserved for ISO use
	106 : ['ans', 999, VARIABLE_LENGTH],        //Reserved for ISO use
	107 : ['ans', 999, VARIABLE_LENGTH],        //Reserved for ISO use
	108 : ['ans', 999, VARIABLE_LENGTH],        //Reserved for ISO use
	109 : ['ans', 999, VARIABLE_LENGTH],        //Reserved for ISO use
	110 : ['ans', 999, VARIABLE_LENGTH],        //Reserved for ISO use
	111 : ['ans', 999, VARIABLE_LENGTH],        //Reserved for private use
	112 : ['ans', 999, VARIABLE_LENGTH],        //Reserved for private use
	113 : ['n',   11,  VARIABLE_LENGTH],        //Reserved for private use
	114 : ['ans', 999, VARIABLE_LENGTH],        //Reserved for national use
	115 : ['ans', 999, VARIABLE_LENGTH],        //Reserved for national use
	116 : ['ans', 999, VARIABLE_LENGTH],        //Reserved for national use
	117 : ['ans', 999, VARIABLE_LENGTH],        //Reserved for national use
	118 : ['ans', 999, VARIABLE_LENGTH],        //Reserved for national use
	119 : ['ans', 999, VARIABLE_LENGTH],        //Reserved for national use
	120 : ['ans', 999, VARIABLE_LENGTH],        //Reserved for private use
	121 : ['ans', 999, VARIABLE_LENGTH],        //Reserved for private use
	122 : ['ans', 999, VARIABLE_LENGTH],        //Reserved for national use
	123 : ['ans', 999, VARIABLE_LENGTH],        //Reserved for private use
	124 : ['ans', 255, VARIABLE_LENGTH],        //Info Text
	125 : ['ans', 50,  VARIABLE_LENGTH],        //Network management information
	126 : ['ans', 6,   VARIABLE_LENGTH],        //Issuer trace id
	127 : ['ans', 999, VARIABLE_LENGTH],        //Reserved for private use
	128 : ['b',   16,  FIXED_LENGTH]            //Message authentication code (MAC) field
}

module.exports = {
  DataElement : dataElement,
  FIXED_LENGTH : FIXED_LENGTH,
  VARIABLE_LENGTH : VARIABLE_LENGTH
}

