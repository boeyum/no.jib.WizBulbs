# WizBulb for Homey *(Unofficial app for Wiz Lightbulbs)*

The company Wiz (https://www.wizconnected.com/) has developed several smart light bulbs based on WiFi interface. In order to be able to use the bulbs together with Homey, there was a need to develop a new app. The app is not based on any official API from Wiz, and the use of the app is therefore at your own risk.

## Support

Support for all Wiz light bulbs cannot be guaranteed, but most should work. The ones that should be the tested or partly tested are mentioned in the table below, but only one has been tested so far. Scenery has support in Wiz's light bulbs, but will not be supported in this version of the app since bulbs with this function have been tested. The feature can be implemented in a later version.

## List of bulbs *(tested / not tested)*
<center><table style="background:#cce6ff">
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
    <td><b>Filament LED</b><br>8718699787158<br>8718699786694<br>8718699787172</td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"> </td>
    <td style="text-align:center"> </td>
    <td style="text-align:center"><br><b>&checkmark;</b><br>-<br>-</td>
  </tr>
  <tr>
    <td><b>Full color LED</b><br>8718699787059<br>8718699786199<br>8719514551275</td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><b>&checkmark;</b></td>
    <td style="text-align:center"><br>-<br>-<br>-</td>
  </tr>
</table></center>

# LightBulb setup
To set up the light bulbs, you must use the mobile phone app from Wiz to get each individual light bulb into the wifi network. When this is done, and the light bulbs have been assigned an IP address, they will be recognized by the app. It should be noted that the light bulbs will appear in the 2.4Ghz network and require the app to be in the same network. This means that in the worst case you have to turn off the 5Ghz network while detecting the light bulbs.

# Remarks
This app is experimental and may therefore contain errors and omissions. The app is not based an official library from Wiz and all use of the app is at your own risk.

# Change log

**0.1.0** Initial test version of the application

# Licens
[MIT](https://github.com)

