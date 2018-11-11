
set buffer ""

proc head {} {
  append ::buffer {
    <!doctype html>
    <html>
    <head>
      <title>Tito's site</title>
      <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
      <link rel="stylesheet" href="../css/bootstrap.min.css" />
      <link rel="stylesheet" href="../css/bootstrap-theme.min.css" />
      <style>
        body {
          font-size: 18px !important;
        }

        @media (min-width: 1200px) {
          .container {
            width: 970px;
          }
        }

        li {
          list-style: circle;
          padding-bottom: 15px;
        }
      </style>
    </head>
    <body>
      <div class="container">

        <div class="row">
          <div class="col-md-12">
            <div>
              <div style="margin-top:20px">
                <h1 style="display:inline">
                    H&eacute;ctor Francisco Hern&aacute;ndez
                </h1>
                <p style="font-weight:none; display:inline">&nbsp;(a.k.a. Tito)<p>
              <div>
                <p>
                    <img src="../img/dilbert17.jpg" style="width:50px" />
                    Senior Software Engineer
                </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div style="border-bottom:1px solid #e5e5e5;  margin-bottom:10px;"> </div>
            <div><a href="../index.html"><span class="glyphicon glyphicon-home"></span> &nbsp;Back to index</a></div>
  }
}

proc foot {} {
  append ::buffer {
        </div>
        <div class="row">
          <div class="col-md-12">
            <footer class="footer" style="border-top:1px solid #e5e5e5; padding-top:19px; margin-top:10px; color:#777; font-size:14px">
              <p>This web site is proudly powered by Hypertext Markup Language.</p>
            </footer>
            
          </div>
        </div>

      </div> <!-- /container -->
    </body>
    </html>
  }
}

proc t {txt} {
  append ::buffer <h2> $txt </h2> \n
}

proc st {txt} {
  append ::buffer <h3> $txt </h3> \n
}

proc p {txt} {
  append ::buffer <p> $txt </p> \n
}

proc img {filename} {
  append ::buffer "<img src=\"$filename\" style=\"margin-top:10px;margin-bottom:10px\" />" \n
}

proc ol {inner} {
  append ::buffer <ol> $inner </ol> \n
}

proc end {filename} {
  foot
  writeToFile $filename $::buffer
}

# Write data to file.
proc writeToFile {filename data} {
  set fd [open $filename "CREAT WRONLY"]
  puts -nonewline $fd $data
  close $fd
}

head

