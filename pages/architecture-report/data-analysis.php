<h2>
    Postgres DB  
</h2>
<p>
    Postgres is main database bla bla bla
</p>

<h3>
    Tables.
</h3>

<table>

<?php
$row = 1;

if (($handle = fopen("db-tables.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, "|")) !== FALSE) {
        echo '<tr>';
        echo "<td style=\"vertical-align:top\">$data[0]</td>";
        echo "<td style=\"padding-bottom:1rem\">$data[1]</td>";
        echo '</tr>';
    }
    fclose($handle);
}
?>
</table>

<h3>
    To do.
</h3>

<ol>
    <li>Add more indexes.</li>
    <li>Historical data removal.</li>
    <li>Data types.</li>
    <li>Postgres upgrade.</li>
    <li>Top queries report.</li>
    <li>Slow queries report.</li>
    <li>Table size/disk space growth report.</li>
    <li>DB resources usage chart.</li>
</ol>

<h2>Redis</h2>

<p>
    Redis is an in-memory db used to store temporary data in key-value format.
</p>

<h3>Date stored.</h3>

<ol>
    <li>Refresh tokens.</li>
    <li>Login history.</li>
    <li>Activity log.</li>
    <li>Forgot passowrd tokens.</li>
    <li>Activate account tokens.</li>
    <li>Email verification tokens.</li>
    <li>Throttle</li>
    <li>Cache</li>
    <li>Async tasks</li>
    <li>Device tokens for push notifications.</li>
</ol>

<h3>Data not sotpred</h3>
<ol>
    <li>Throttling</li>
    </ol>

<div>
</div>
