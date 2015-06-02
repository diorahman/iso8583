<?php

namespace JAK8583;

// +------------------------------------------------------------------------+
// | JAK8583.class.php														|
// +------------------------------------------------------------------------+
// | Copyright (c) Jimmi Kembaren 2009. All rights reserved.				|
// | Version	   0.7														|
// |		customize bit 29 & 31						|
// | Last modified 16/05/2009												|
// | Email		   jimmi.kembaren@gmail.com									|
// | Web		   http://www.iso8583online.com								|
// +------------------------------------------------------------------------+
// | This program is free software; you can redistribute it and/or modify	|
// | it under the terms of the GNU General Public License version 2 as		|
// | published by the Free Software Foundation.								|
// |																		|
// | This program is distributed in the hope that it will be useful,		|
// | but WITHOUT ANY WARRANTY; without even the implied warranty of			|
// | MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the			|
// | GNU General Public License for more details.							|
// |																		|
// | You should have received a copy of the GNU General Public License		|
// | along with this program; if not, write to the							|
// |   Free Software Foundation, Inc., 59 Temple Place, Suite 330,			|
// |   Boston, MA 02111-1307 USA											|
// |																		|
// | Please give credit on sites that use class.upload and submit changes	|
// | of the script so other people can use them as well.					|
// | This script is free to use, don't abuse.								|
// +------------------------------------------------------------------------+
//


class JAK8583
{
	const VARIABLE_LENGTH = TRUE;
	const FIXED_LENGTH    = FALSE;
	
	private $DATA_ELEMENT = array (
		1   => array('b',   16,  self::FIXED_LENGTH),           //Bit Map Extended
		2   => array('an',  19,  self::VARIABLE_LENGTH),        //Primary account number (PAN
		3   => array('n',   6,   self::FIXED_LENGTH),           //Precessing code
		4   => array('n',   12,  self::FIXED_LENGTH),           //Amount transaction
		5   => array('n',   12,  self::FIXED_LENGTH),           //Amount reconciliation
		6   => array('n',   12,  self::FIXED_LENGTH),           //Amount cardholder billing
		7   => array('an',  10,  self::FIXED_LENGTH),           //Date and time transmission
		8   => array('n',   8,   self::FIXED_LENGTH),           //Amount cardholder billing fee
		9   => array('n',   8,   self::FIXED_LENGTH),           //Conversion rate reconciliation
		10  => array('n',   8,   self::FIXED_LENGTH),           //Conversion rate cardholder billing
		11  => array('n',   6,   self::FIXED_LENGTH),           //Systems trace audit number
		12  => array('n',   6,   self::FIXED_LENGTH),           //Date and time local transaction
		13  => array('n',   4,   self::FIXED_LENGTH),           //Date effective
		14  => array('n',   4,   self::FIXED_LENGTH),           //Date expiration
		15  => array('n',   4,   self::FIXED_LENGTH),           //Date settlement
		16  => array('n',   4,   self::FIXED_LENGTH),           //Date conversion
		17  => array('n',   4,   self::FIXED_LENGTH),           //Date capture
		18  => array('n',   4,   self::FIXED_LENGTH),           //Message error indicator
		19  => array('n',   3,   self::FIXED_LENGTH),           //Country code acquiring institution
		20  => array('n',   3,   self::FIXED_LENGTH),           //Country code primary account number (PAN
		21  => array('n',   3,   self::FIXED_LENGTH),           //Transaction life cycle identification data
		22  => array('n',   3,   self::FIXED_LENGTH),           //Point of service data code
		23  => array('n',   3,   self::FIXED_LENGTH),           //Card sequence number
		24  => array('n',   3,   self::FIXED_LENGTH),           //Function code
		25  => array('n',   2,   self::FIXED_LENGTH),           //Message reason code
		26  => array('n',   2,   self::FIXED_LENGTH),           //Merchant category code
		27  => array('n',   1,   self::FIXED_LENGTH),           //Point of service capability
		28  => array('n',   8,   self::FIXED_LENGTH),           //Date reconciliation
		29  => array('an',  9,   self::FIXED_LENGTH),           //Reconciliation indicator
		30  => array('n',   8,   self::FIXED_LENGTH),           //Amounts original
		31  => array('an',  9,   self::FIXED_LENGTH),           //Acquirer reference number
		32  => array('n',   11,  self::VARIABLE_LENGTH),        //Acquiring institution identification code
		33  => array('n',   11,  self::VARIABLE_LENGTH),        //Forwarding institution identification code
		34  => array('an',  28,  self::VARIABLE_LENGTH),        //Electronic commerce data
		35  => array('z',   37,  self::VARIABLE_LENGTH),        //Track 2 data
		36  => array('n',   104, self::VARIABLE_LENGTH),        //Track 3 data
		37  => array('an',  12,  self::FIXED_LENGTH),           //Retrieval reference number
		38  => array('an',  6,   self::FIXED_LENGTH),           //Approval code
		39  => array('an',  2,   self::FIXED_LENGTH),           //Action code
		40  => array('an',  3,   self::FIXED_LENGTH),           //Service code
		41  => array('ans', 8,   self::FIXED_LENGTH),           //Card acceptor terminal identification
		42  => array('ans', 15,  self::FIXED_LENGTH),           //Card acceptor identification code
		43  => array('ans', 40,  self::FIXED_LENGTH),           //Card acceptor name/location
		44  => array('an',  25,  self::VARIABLE_LENGTH),        //Additional response data
		45  => array('an',  76,  self::VARIABLE_LENGTH),        //Track 1 data
		46  => array('an',  999, self::VARIABLE_LENGTH),        //Amounts fees
		47  => array('an',  999, self::VARIABLE_LENGTH),        //Additional data national
		48  => array('ans', 119, self::VARIABLE_LENGTH),        //Additional data private
		49  => array('an',  3,   self::FIXED_LENGTH),           //Verification data
		50  => array('an',  3,   self::FIXED_LENGTH),           //Currency code, settlement
		51  => array('a',   3,   self::FIXED_LENGTH),           //Currency code, cardholder billing
		52  => array('an',  16,  self::FIXED_LENGTH),           //Personal identification number (PIN) data
		53  => array('an',  18,  self::FIXED_LENGTH),           //Security related control information
		54  => array('an',  120, self::FIXED_LENGTH),           //Amounts additional
		55  => array('ans', 999, self::VARIABLE_LENGTH),        //Integrated circuit card (ICC) system related data
		56  => array('ans', 999, self::VARIABLE_LENGTH),        //Original data elements
		57  => array('ans', 999, self::VARIABLE_LENGTH),        //Authorisation life cycle code
		58  => array('ans', 999, self::VARIABLE_LENGTH),        //Authorising agent institution identification code
		59  => array('ans', 99,  self::VARIABLE_LENGTH),        //Transport data
		60  => array('ans', 60,  self::VARIABLE_LENGTH),        //Reserved for national use
		61  => array('ans', 99,  self::VARIABLE_LENGTH),        //Reserved for national use
		62  => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for private use
		63  => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for private use
		64  => array('b',   16,  self::FIXED_LENGTH),           //Message authentication code (MAC) field
		65  => array('b',   16,  self::FIXED_LENGTH),           //Bitmap tertiary
		66  => array('n',   1,   self::FIXED_LENGTH),           //Settlement code
		67  => array('n',   2,   self::FIXED_LENGTH),           //Extended payment data
		68  => array('n',   3,   self::FIXED_LENGTH),           //Receiving institution country code
		69  => array('n',   3,   self::FIXED_LENGTH),           //Settlement institution county code
		70  => array('n',   3,   self::FIXED_LENGTH),           //Network management Information code
		71  => array('n',   4,   self::FIXED_LENGTH),           //Message number
		72  => array('ans', 999, self::VARIABLE_LENGTH),        //Data record
		73  => array('n',   6,   self::FIXED_LENGTH),           //Date action
		74  => array('n',   10,  self::FIXED_LENGTH),           //Credits, number
		75  => array('n',   10,  self::FIXED_LENGTH),           //Credits, reversal number
		76  => array('n',   10,  self::FIXED_LENGTH),           //Debits, number
		77  => array('n',   10,  self::FIXED_LENGTH),           //Debits, reversal number
		78  => array('n',   10,  self::FIXED_LENGTH),           //Transfer number
		79  => array('n',   10,  self::FIXED_LENGTH),           //Transfer, reversal number
		80  => array('n',   10,  self::FIXED_LENGTH),           //Inquiries number
		81  => array('n',   10,  self::FIXED_LENGTH),           //Authorizations, number
		82  => array('n',   12,  self::FIXED_LENGTH),           //Credits, processing fee amount
		83  => array('n',   12,  self::FIXED_LENGTH),           //Credits, transaction fee amount
		84  => array('n',   12,  self::FIXED_LENGTH),           //Debits, processing fee amount
		85  => array('n',   12,  self::FIXED_LENGTH),           //Debits, transaction fee amount
		86  => array('n',   15,  self::FIXED_LENGTH),           //Credits, amount
		87  => array('an',   16, self::FIXED_LENGTH),           //Credits, reversal amount
		88  => array('n',   16,  self::FIXED_LENGTH),           //Debits, amount
		89  => array('n',   16,  self::FIXED_LENGTH),           //Debits, reversal amount
		90  => array('an',  42,  self::FIXED_LENGTH),           //Original data elements
		91  => array('an',  1,   self::FIXED_LENGTH),           //File update code
		92  => array('n',   2,   self::FIXED_LENGTH),           //File security code
		93  => array('n',   5,   self::FIXED_LENGTH),           //Response indicator
		94  => array('an',  7,   self::FIXED_LENGTH),           //Service indicator
		95  => array('an',  42,  self::FIXED_LENGTH),           //Replacement amounts
		96  => array('an',  8,   self::FIXED_LENGTH),           //Message security code
		97  => array('an',  17,  self::FIXED_LENGTH),           //Amount, net settlement
		98  => array('ans', 25,  self::FIXED_LENGTH),           //Payee
		99  => array('n',   11,  self::VARIABLE_LENGTH),        //Settlement institution identification code
		100 => array('n',   11,  self::VARIABLE_LENGTH),        //Receiving institution identification code
		101 => array('ans', 17,  self::FIXED_LENGTH),           //File name
		102 => array('ans', 28,  self::VARIABLE_LENGTH),        //Account identification 1
		103 => array('ans', 28,  self::VARIABLE_LENGTH),        //Account identification 2
		104 => array('an',  99,  self::VARIABLE_LENGTH),        //Transaction description
		105 => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for ISO use
		106 => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for ISO use
		107 => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for ISO use
		108 => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for ISO use
		109 => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for ISO use
		110 => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for ISO use
		111 => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for private use
		112 => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for private use
		113 => array('n',   11,  self::VARIABLE_LENGTH),        //Reserved for private use
		114 => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for national use
		115 => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for national use
		116 => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for national use
		117 => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for national use
		118 => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for national use
		119 => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for national use
		120 => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for private use
		121 => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for private use
		122 => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for national use
		123 => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for private use
		124 => array('ans', 255, self::VARIABLE_LENGTH),        //Info Text
		125 => array('ans', 50,  self::VARIABLE_LENGTH),        //Network management information
		126 => array('ans', 6,   self::VARIABLE_LENGTH),        //Issuer trace id
		127 => array('ans', 999, self::VARIABLE_LENGTH),        //Reserved for private use
		128 => array('b',   16,  self::FIXED_LENGTH)            //Message authentication code (MAC) field
	);

	private $_data   = array();
	private $_bitmap = '';
	private $_mti    = '';
	private $_iso    = '';
	private $_valid  = array();



	/* --------------------------------------------------------------
		private functions
	   -------------------------------------------------------------- */

	/**
	 * return data element in correct format
	 *
	 * @param array $data_element
	 * @param mixed $data
	 * @return string
	 */
	private function _packElement($data_element, $data)
	{
		$result = "";

		//numeric value
		if ($data_element[0] == 'n' && is_numeric($data) && strlen($data)<=$data_element[1])
		{
			$data = str_replace(".", "", $data);

			//fixed length
			if ($data_element[2] == self::FIXED_LENGTH)
			{
        $result = sprintf("%0". $data_element[1] ."s", $data);
			}
			//dynamic length
			else
			{
				if (strlen($data) <= $data_element[1])
				{
					$result = sprintf("%0". strlen($data_element[1])."d", strlen($data)). $data;
				}
			}
		}

		//alpha value
		if (($data_element[0] == 'a' && ctype_alpha($data) && strlen($data)<=$data_element[1]) ||
			($data_element[0] == 'an' && ctype_alnum($data) && strlen($data)<=$data_element[1]) ||
			($data_element[0] == 'z' && strlen($data)<=$data_element[1]) ||
			($data_element[0] == 'ans' && strlen($data)<=$data_element[1]))
		{

			//fixed length
			if ($data_element[2] == self::FIXED_LENGTH)
			{
				$result = sprintf("% ". $data_element[1] ."s", $data);
			}
			//dynamic length
			else
			{
				if (strlen($data) <= $data_element[1])
				{
					$result = sprintf("%0". strlen($data_element[1])."s", strlen($data)). $data;
				}
			}
		}

		//bit value
		if ($data_element[0] == 'b' && strlen($data)<=$data_element[1])
		{
			//fixed length
			if ($data_element[2] == self::FIXED_LENGTH)
			{
				$tmp = sprintf("%0". $data_element[1] ."d", $data);

				while ($tmp!='')
				{
					$result  .= base_convert(substr($tmp, 0, 4), 2, 16);
					$tmp      = substr($tmp, 4, strlen($tmp)-4);
				}
			}
		}
    echo "result -> ". $result ."\n";
		return $result;
	}

	/**
	 * calculate bitmap from data element
	 *
	 * @return string
	 */
	private function _calculateBitmap()
	{
		$tmp  = sprintf("%064d", 0);
    $tmp2 = sprintf("%064d", 0);
    print_r($this->_data);
		foreach ($this->_data as $key =>$val)
    {
			if ($key<65)
			{
				$tmp[$key-1]   = 1;
			}
			else
			{
				$tmp[0]        = 1;
				$tmp2[$key-65] = 1;
      }
      echo "key: ". $key ."\n";
		}
    echo "tmp: ". $tmp ."\n";
    echo "tmp2: ". $tmp2 ."\n";

		$result = "";
		if ($tmp[0] == 1)
		{
			while ($tmp2!='')
			{
				$result  .= base_convert(substr($tmp2, 0, 4), 2, 16);
        echo "result *: ". $result  ." from: ". substr($tmp2, 0, 4)  ."\n";
        $tmp2     = substr($tmp2, 4, strlen($tmp2)-4);
			}
		}
    echo "result: ". $result ."\n";
		$main = "";
		while ($tmp!='')
		{
			$main  .= base_convert(substr($tmp, 0, 4), 2, 16);
			$tmp    = substr($tmp, 4, strlen($tmp)-4);
		}
    echo "bitmap -> ". $main ."". $result ."\n";
		$this->_bitmap = strtoupper($main. $result);

		return $this->_bitmap;
	}


	/**
	 * parse iso string and retrieve mti
	 *
	 * @return void
	 */
	private function _parseMTI()
	{
		$this->addMTI(substr($this->_iso, 0, 4));
		if (strlen($this->_mti) == 4 && $this->_mti[1]!=0)
		{
			$this->_valid['mti'] = true;
		}
	}

	/**
	 * clear all data
	 *
	 * @return void
	 */
	private function _clear()
	{
		$this->_mti    = '';
		$this->_bitmap = '';
		$this->_data   = '';
		$this->_iso    = '';
	}

	/**
	 * parse iso string and retrieve bitmap
	 *
	 * @return string
	 */
	private function _parseBitmap()
	{
		$this->_valid['bitmap'] = false;
		$inp                    = substr($this->_iso, 4, 32);
		if (strlen($inp)>=16)
		{
			$primary    = '';
			$secondary  = '';
			for ($i = 0; $i<16; $i++)
			{
        $primary .= sprintf("%04d", base_convert($inp[$i], 16, 2));
			}
			if ($primary[0] == 1 && strlen($inp)>=32)
			{
				for ($i=16; $i<32; $i++)
				{
					$secondary .= sprintf("%04d", base_convert($inp[$i], 16, 2));
				}
				$this->_valid['bitmap'] = true;
			}
			if ($secondary == '') $this->_valid['bitmap'] = true;
    }
		//save to data element with ? character
    $tmp    = $primary. $secondary;
		for ($i = 0; $i<strlen($tmp); $i++)
		{
			if ($tmp[$i] == 1)
			{
				$this->_data[$i+1] = '?';
			}
		}
		$this->_bitmap = $tmp;
		return $tmp;
	}

	/**
	 * parse iso string and retrieve data element
	 *
	 * @return array
	 */
	private function _parseData()
	{
		if (isset($this->_data[1]) && $this->_data[1]  ==  '?')
		{
			$inp = substr($this->_iso, 4+32, strlen($this->_iso)-4-32);
		}
		else
		{
			$inp = substr($this->_iso, 4+16, strlen($this->_iso)-4-16);

    }
		if (is_array($this->_data))
		{
			$this->_valid['data']         = true;
			foreach ($this->_data as $key =>$val)
			{
        $this->_valid['de'][$key] = false;
        print 'Current key: '. $key. "\n";
				if ($this->DATA_ELEMENT[$key][0]!='b')
        {
          print 'is not b'. '\n';
					//fixed length
					if ($this->DATA_ELEMENT[$key][2] == self::FIXED_LENGTH)
          {
            print 'is fixed'. '\n';
						$tmp = substr($inp, 0, $this->DATA_ELEMENT[$key][1]);
						if (strlen($tmp) == $this->DATA_ELEMENT[$key][1])
						{
							if ($this->DATA_ELEMENT[$key][0] == 'n')
							{
								$this->_data[$key] = substr($inp, 0, $this->DATA_ELEMENT[$key][1]);
							}
							else
							{
								$this->_data[$key] = ltrim(substr($inp, 0, $this->DATA_ELEMENT[$key][1]));
							}
							$this->_valid['de'][$key] = true;
              $inp                      = substr($inp, $this->DATA_ELEMENT[$key][1], strlen($inp)-$this->DATA_ELEMENT[$key][1]);
						}
					}
					//dynamic length
					else
					{
            print 'is dynamic'. '\n';
						$len = strlen($this->DATA_ELEMENT[$key][1]);
            $tmp = substr($inp, 0, $len);
            print 'tmp: '. $tmp. ' - '. $len .'\n';
						if (strlen($tmp) == $len )
						{
							$num = (integer) $tmp;
							$inp = substr($inp, $len, strlen($inp)-$len);

							$tmp2 = substr($inp, 0, $num);
							if (strlen($tmp2) == $num)
							{
								if ($this->DATA_ELEMENT[$key][0] == 'n')
								{
									$this->_data[$key] = (double) $tmp2;
								}
								else
								{
									$this->_data[$key] = ltrim($tmp2);
								}
								$inp                      = substr($inp, $num, strlen($inp)-$num);
								$this->_valid['de'][$key] = true;
							}
						}

					}
				}
				else
        {
          print 'is b\n';
					if ($key>1)
					{
						//fixed length
						if ($this->DATA_ELEMENT[$key][2] == self::FIXED_LENGTH)
						{
							$start = false;
							for ($i = 0; $i<$this->DATA_ELEMENT[$key][1]/4; $i++)
							{
								$bit = base_convert($inp[$i], 16, 2);

								if ($bit!=0) $start = true;
								if ($start) $this->_data[$key] .= $bit;
							}
							$this->_data[$key] = $bit;
						}
					}
					else
					{
						$tmp = substr($this->_iso, 4+16, 16);
						if (strlen($tmp) == 16)
						{
							$this->_data[$key]        = substr($this->_iso, 4+16, 16);
							$this->_valid['de'][$key] = true;
						}
					}
				}
        if (!$this->_valid['de'][$key]) $this->_valid['data'] = false;
        print_r($this->_data);
			}
		}

		return $this->_data;
	}

	/* -----------------------------------------------------
		public methods
	   ----------------------------------------------------- */

	/**
	 * add data element
	 *
	 * @param int $bit
	 * @param mixed $data
	 * @return void
	 */
	public function addData($bit, $data)
	{
		if ($bit<1 || $bit>128)
			throw new \Exception('addData invalid bit:'.$bit.':'.$data);

    $result = $this->_packElement($this->DATA_ELEMENT[$bit], $data);

		if (is_null($result))
			throw new \Exception('addData failure for bit:'.$bit);

		$this->_data[$bit] = $result;
		ksort($this->_data);
		$this->_calculateBitmap();
	}

	/**
	 * add MTI
	 *
	 * @param string $mti
	 * @return void
	 */
	public function addMTI($mti)
	{
		if (strlen($mti) == 4 && ctype_digit($mti))
		{
			$this->_mti = $mti;
		}
	}


	/**
	 * retrieve data element
	 *
	 * @return array
	 */
	public function getData()
	{
		return $this->_data;
	}

	/**
	 * retrieve bitmap
	 *
	 * @return string
	 */
	public function getBitmap()
	{
		return $this->_bitmap;
	}

	/**
	 * retrieve mti
	 *
	 * @return string
	 */
	public function getMTI()
	{
		return $this->_mti;
	}

	/**
	 * retrieve iso with all complete data
	 *
	 * @return string
	 */
	public function getISO()
	{
		$this->_iso = $this->_mti. $this->_bitmap. implode($this->_data);
		return $this->_iso;
	}

	/**
	 * add ISO string
	 *
	 * @param string $iso
	 * @return void
	 */
	public function addISO($iso)
	{
		$this->_clear();
		if ($iso!='')
		{
			$this->_iso = $iso;
			$this->_parseMTI();
			$this->_parseBitmap();
			$this->_parseData();
		}
	}

	/**
	 * return true if iso string is a valid 8583 format or false if not
	 *
	 * @return bool
	 */
	public function validateISO()
	{
		return $this->_valid['mti'] && $this->_valid['bitmap'] && $this->_valid['data'];
	}

	/**
	 * remove existing data element
	 *
	 * @param int $bit
	 * @return void
	 */
	public function removeData($bit)
	{
		if ($bit>1 && $bit<129)
		{
			unset($this->_data[$bit]);
			ksort($this->_data);
			$this->_calculateBitmap();
		}
	}

	/**
	 * redefine bit definition
	 *
	 * @param int $bit
	 * @param string $type
	 * @param int $length
	 * @param bool $dynamic
	 * @return void
	 */
	public function redefineBit($bit, $type, $length, $dynamic)
	{
		if ($bit>1 && $bit<129)
		{
			$this->DATA_ELEMENT[$bit] = array($type, $length, $dynamic);
		}
	}

}
