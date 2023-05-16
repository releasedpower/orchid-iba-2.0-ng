<strong>Database Connected: </strong>
<?php
    try {
        \DB::connection()->getPDO();
        echo \DB::connection()->getDatabaseName();
        } catch (\Exception $e) {
        echo 'None';
    }
?>
<?php /**PATH C:\xampp\htdocs\ib-laravel-8\resources\views/welcome.blade.php ENDPATH**/ ?>