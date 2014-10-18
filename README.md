doform
======

Create an html page form with CSS design and position, and manage save and restore of form values in one-text format 


doform documentation

doform.html
This file aims to create the html files of a form (example for a root "persoform"):
"List" --> List of value names to be managed in the form
"Html With External Css" -> source to copy in the main form file ("persoform.html")
"External Css" --> source to copy in the CSS file ("persoform.css")
"Position Manip" --> source to copy in the "Move" file ("persoform-move.html")


File names below are based on the example of root "persoform"

-----
persoform-value.txt
(Not mandatory)
Text file containing the list of values to be managed in the form (Save of the "List" field in doform.html)

-----
persoform.html
(Source: field "Html With External Css" of doform.html)

-----
persoform.css
(Source: field "External Css" of doform.html)
Note: add the text below at the beginning of the file (no "end" text, beware of the jpg file name)
@media print {
 input { border-style: hidden; }
}
body {
  background-image:url(persoform.jpg);
  background-repeat:no-repeat;
}
input { font-size:10 }


-----
persoform-move.html
(Source: field "Position Manip" of doform.html)
