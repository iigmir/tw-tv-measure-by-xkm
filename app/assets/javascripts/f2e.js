// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$( document ).ready( () => main() );

function main()
{
    let test = () =>
    {
        $("h1").addClass("foo");
        $("#ax").html("<p> Hi </p>");
    };
    $(".datepicker").datepicker({
        format: "yyyy-mm-dd",
        startDate: "-3d"
    });
}