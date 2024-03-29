# WizBulb for Homey *(Unofficial app for Wiz Lightbulbs++)*

The company Wiz (https://www.wizconnected.com/) has developed several smart light bulbs based on WiFi interface. In order to be able to use the bulbs together with Homey, there was a need to develop a new app. The app is not based on any official API from Wiz, and the use of the app is therefore at your own risk.

## Support

Support for all Wiz light bulbs cannot be guaranteed, but most should work. The ones that should be the tested or partly tested are mentioned in the table below, but only one has been fully tested so far. The current application uses SDK 3 and Homey =>5.0.0.<br><br>
From version 2.4.0, support for Wiz ceiling ceiling lights has been added and from version 2.5.0 Wiz SmartPlug are added. These will be listed in the table as bulbs. 
# LightBulb setup
To setup the light bulbs, you must use the mobile phone app from Wiz to get each individual light bulb into the wifi network. When this is done, and the light bulbs have been assigned an IP address, you do the pairing. Make a regular pairing in the Homey app and select the type of light bulb you want to search for. The app will return the available light bulbs of the type you have requested. Select the light bulb you want to pair, and change the name with advanced settings after pairing.


## List of bulbs *(tested / not tested)*
The abbreviations in the table below stand for *on/off* = bulb on / off, *dim* = dimming, *temp* = color temperature in kelvin and *scenery* = the bulbs built-in scenery programs. The number described in the 'device' column is the EAN / UPC indication for the product.
<center>
<table style="background:#cce6ff">
  <tr>
    <th style="width:150px">Device</th>
    <th  style="width:75px">On/Off</th>
    <th  style="width:75px">Dim.</th>
    <th  style="width:75px">Temp.</th>
    <th  style="width:75px">RGB Color</th>
    <th  style="width:75px">Scenery</th>
    <th  style="width:75px">Tested</th>
  </tr>
  <tr>
    <td><b>Filament LED<br><i>(wizfilament)</i></b>  <br>8718699787158<br>8718699786694<br>8718699787172</td>
    <td style="text-align:center"><br><b>&checkmark;</b></td>
    <td style="text-align:center"><br><b>&checkmark;</b></td>
    <td style="text-align:center"><br><b>&checkmark;</b></td>
    <td style="text-align:center"> </td>
    <td style="text-align:center"><br><b>&checkmark;</b></td>
    <td style="text-align:center"><br><br><b>&checkmark;</b><br>-<br>-</td>
  </tr>
  <tr>
    <td><b>Full color LED<br><i>(wizcolor)</i></b><br>8718699787059<br>8718699786199<br>8719514551275</td>
    <td style="text-align:center"><br><b>&checkmark;</b></td>
    <td style="text-align:center"><br><b>&checkmark;</b></td>
    <td style="text-align:center"><br><b>&checkmark;</b></td>
    <td style="text-align:center"><br><b>&checkmark;</b></td>
    <td style="text-align:center"><br><b>&checkmark;</b></td>
    <td style="text-align:center"><br><br><b>&checkmark;</b><br>-<br>-</td>
  </tr>
<tr>
    <td><b>On/Off+Dim LED<br><i>(wizsimple)</i></b><br>8718699785031<br>8718699785079<br>8718699785116</td>
    <td style="text-align:center"><br><b>&checkmark;</b></td>
    <td style="text-align:center"><br><b>&checkmark;</b></td>
    <td style="text-align:center"><br><b></b></td>
    <td style="text-align:center"><br><b></b></td>
    <td style="text-align:center"><br><b></b></td>
    <td style="text-align:center"><br><br>-<br>-<br>-</td>
  </tr>
<tr>
    <td><b>Wiz ceiling lamp<br><i>(plafond)</i></b><br>8719514337978<br>8719514337992<br>8719514338012<br>8719514338036</td>
    <td style="text-align:center"><br><b>&checkmark;</b></td>
    <td style="text-align:center"><br><b>&checkmark;</b></td>
    <td style="text-align:center"><br><b>&checkmark;</b></td>
    <td style="text-align:center"><br><b></b></td>
    <td style="text-align:center"><br><b>&checkmark;</b></td>
    <td style="text-align:center"><br><br><b>&checkmark;</b><br>-<br>-<br>-</td>
  </tr>
<tr>
    <td><b>Wiz SmartPlug<br><i>(WizSmartPlug)</i></b><br>8718699789329</td>
    <td style="text-align:center"><br><b>&checkmark;</b></td>
    <td style="text-align:center"><br></td>
    <td style="text-align:center"><br></td>
    <td style="text-align:center"><br></td>
    <td style="text-align:center"><br></td>
    <td style="text-align:center"><br><b>&checkmark;</b></td>
  </tr>
</table></center>

## LightBulb scenary *(support)*
<center><table style="background:#cce6ff">
  <tr>
    <th style="width:150px">Scenario</th>
    <th  style="width:100px">wizfilament</th>
    <th  style="width:100px">wizcolor.</th>
    <th  style="width:100px">wizsimple.</th>
    <th  style="width:100px">plafond.</th>
    <th  style="width:100px">Remarks</th>
  </tr>
  <tr>
    <td><b>NORMAL</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center">2700K</td>
  </tr>
  <tr>
    <td><b>OCEAN</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>ROMANCE</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>SUNSET</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>PARTY</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>FIREPLACE</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>COZY</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
     <td style="text-align:center"><b>&checkmark;</b></td>
   <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>FOREST</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>PASTEL COLORS</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>WAKE_UP</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>BEDTIME</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
   <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>WARM WHITE</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>DAYLIGHT</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
   <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>COOL WHITE</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>NIGHT LIGHT</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>FOCUS</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
  <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>RELAX</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>TRUE COLORS</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>TV-TIME</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
   <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>PLANTGROWTH</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>SPRING</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>SUMMER</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>FALL</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>DEEPDIVE</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>JUNGLE</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>MOJITO</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>CLUB</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>CHRISTMAS</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>HALLOWEEN</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>CANDLELIGHT</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"> </td>
  </tr>
  <tr>
    <td><b>GOLDEN WHITE</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>-</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"> </td>
  </tr>
</table></center>


# Remarks
This app is experimental and may therefore contain errors and omissions. The app is not based an official library from Wiz and all use of the app is at your own risk.

# Change log

**0.5.0** Initial test version of the application

**1.0.0** Initial version of the application (Privat)

**1.0.1** Used SDK 3. Bug fixes.

**2.0.0** Homey => 5.0.0. Changed pairing functionality, and added scenery support.

**2.0.1** Bug fixes.

**2.0.2** Fixed color bulb issues.

**2.1.0** Release to community store.

**2.1.1** Bug fix color bulb.

**2.2.0** Bug fixes.

**2.3.0** Bug fixes.

**2.4.0** Added support for Wiz plafond ceiling lamps.

**2.5.0** Added support for Wiz smartplug.

# Licens
[MIT](https://github.com)











