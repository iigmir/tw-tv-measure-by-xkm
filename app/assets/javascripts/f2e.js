// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$( document ).ready( () => main() );

function main()
{
    $(".datepicker").datepicker({
        format: "yyyy-mm-dd",
        startDate: "-3d"
    });
}