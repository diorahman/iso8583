<?php

require 'JAK8583.php';

$iso	= '0800822000000000000004000000000000000516063439749039301';

$jak = new JAK8583\JAK8583();

//add data
$jak->addISO($iso);


//get parsing result
print 'ISO: '. $iso. "\n";
print 'MTI: '. $jak->getMTI(). "\n";
print 'ISO: '. $jak->getISO(). "\n";
print 'Bitmap: '. $jak->getBitmap(). "\n";
print 'Data Element: '; print_r($jak->getData());
