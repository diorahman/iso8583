<?php

require 'JAK8583.php';

$iso	= '9210623A40010AC180000608400138000104022047200000132047200402040360120300200000000001300DEVELKAI201000400200000088PWT SDA';

$jak = new JAK8583\JAK8583();

//add data
$jak->addISO($iso);


//get parsing result
print 'ISO: '. $iso. "\n";
print 'MTI: '. $jak->getMTI(). "\n";
print 'ISO: '. $jak->getISO(). "\n";
print 'Bitmap: '. $jak->getBitmap(). "\n";
print 'Data Element: '; print_r($jak->getData());
