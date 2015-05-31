<?php
require 'JAK8583.php';

$jak	= new JAK8583\JAK8583();

$date = date("mdHis");
$date = "0531203842";

//add data
$jak->addMTI('0800');
$jak->addData(7, $date);
$jak->addData(11, 286808);
$jak->addData(70, '301');

//get iso string
//print $jak->getISO();
