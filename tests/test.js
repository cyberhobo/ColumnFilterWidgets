test( 'default load state', function() {
	var $fixture = $( '#qunit-fixture' ),
		$first_row_cells = $fixture.find( 'tbody tr' ).eq( 0 ).find( 'td' ),
		$widgets;

	$( '#example' ).dataTable( {
		"sDom": 'W<"clear">lfrtip'
	} );

	equal( 
		$fixture.find( '.column-filter-widgets' ).length, 
		1, 
		'The widget container element is present.' 
	);

	$widgets = $fixture.find( '.column-filter-widget' );
	equal(
		$widgets.length,
		$fixture.find( 'thead th' ).length,
		'One widget is present for each table column.'
	);

	$widgets.each( function( i ) {
		var $widget = $( this ), 
			cell_html = $first_row_cells.eq( i ).html();
		equal(
			$widget.find( 'select option[value="' + cell_html + '"]' ).length,
			1,
			'"' + cell_html + '" is present in widget ' + i + '.'
		);
	} );

} );

test( 'basic interactions', function() {
	var $fixture = $( '#qunit-fixture' ),
		$widgets,
		$engine_widget;

	$( '#example' ).dataTable( {
		"sDom": 'W<"clear">lfrtip'
	} );

	$widgets = $fixture.find( '.column-filter-widget' );

	$engine_widget = $widgets.eq( 0 );
	$engine_widget.find( 'select' ).val( 'Misc' ).trigger( 'change' );
	equal(
		$engine_widget.find( '.filter-term-misc' ).length,
		1,
		'Engine term "Misc" is added when selected.'
	);

	equal(
		$fixture.find( 'tbody tr' ).length,
		7,
		'"Misc" filter finds 7 rows.'
	);

	equal(
		$widgets.eq( 3 ).find( 'select' ).attr( 'disabled' ),
		'disabled',
		'Version widget is disabled - no further options.'
	);

	$grade_widget = $widgets.eq( 4 );
	equal(
		$grade_widget.find( 'select option' ).length,
		4,
		'Grade widget still has 3 options.'
	);

	$grade_widget.find( 'select' ).val( 'X' ).trigger( 'change' );
	equal(
		$grade_widget.find( '.filter-term-x' ).length,
		1,
		'Grade term "X" is added when selected.'
	);

	equal(
		$fixture.find( 'tbody tr' ).length,
		3,
		'"Misc" + "X" filter finds 3 rows.'
	);

	$engine_widget.find( '.filter-term' ).click();
	equal(
		$engine_widget.find( '.filter-term-misc' ).length,
		0,
		'Engine term "Misc" is removed when clicked.'
	);

	equal(
		$fixture.find( 'tbody tr' ).length,
		5,
		'"X" filter finds 5 rows.'
	);

	equal(
		$widgets.eq( 3 ).find( 'select' ).attr( 'disabled' ),
		undefined,
		'Grade widget now has an option and is re-enabled.'
	);

	$grade_widget.find( 'select' ).val( 'C' ).trigger( 'change' );
	equal(
		$grade_widget.find( '.filter-term' ).length,
		2,
		'Grade terms "C" and "X" can both be selected.'
	);

	equal(
		$fixture.find( 'tbody tr' ).length,
		10,
		'Now a full page of 10 rows are loaded.'
	);

	$( '#example_filter input:text' ).val( 'text' ).trigger( 'keyup' );
	equal(
		$fixture.find( 'tbody tr' ).length,
		2,
		'Adding a search filter for "text" reduces results to 2.'
	);

	equal(
		$grade_widget.find( '.filter-term' ).length,
		2,
		'Grade terms "C" and "X" are still selected.'
	);

	$grade_widget.find( '.filter-term-x' ).click();
	ok(
		$fixture.find( 'tbody td' ).hasClass( 'dataTables_empty' ),
		'Removing grade term "X", leaving "C" + "text" search reduces results to 0.'
	);

	$grade_widget.find( '.filter-term-c' ).click();
	equal(
		$fixture.find( 'tbody tr' ).length,
		2,
		'Removing grade term "C", leaving "text" search restores results to 2.'
	);

} );

test( 'separated values', function() {
	var $fixture = $( '#qunit-fixture' ),
		$widgets,
		$platform_widget;

   $('#example').dataTable( {
		"sDom": 'W<"clear">lfrtip',
		"oColumnFilterWidgets": {
			"sSeparator": "\\s*/+\\s*"
		}
	} );

	$widgets = $fixture.find( '.column-filter-widget' );

	$platform_widget = $widgets.eq( 2 );
	equal(
		$platform_widget.find( 'option[value="Win 98+"]' ).length,
		1,
		'"Win98+" is present as a single option.'
	);

	equal(
		$platform_widget.find( 'option[value="OSX.3+"]' ).length,
		1,
		'"OSX.3+" is present as a single option.'
	);

	$platform_widget.find( 'select' ).val( 'OSX.3+' ).trigger( 'change' );
	equal(
		$platform_widget.find( '.filter-term-osx3' ).length,
		1,
		'Platform term "OSX.3+" is added when selected.'
	);

	equal(
		$platform_widget.find( 'option[value="OSX.3+"]' ).length,
		0,
		'"OSX.3+" is no longer present as a single option.'
	);

	equal(
		$fixture.find( 'tbody tr' ).length,
		5,
		'There are 5 results that include "OSX.3+".'
	);

   $platform_widget.find( 'select' ).val( 'KDE 3.1' ).trigger( 'change' );
	equal(
		$platform_widget.find( '.filter-term-kde31' ).length,
		1,
		'Platform term "KDE 3.1" is added when selected.'
	);

	equal(
		$platform_widget.find( 'option[value="KDE 3.1"]' ).length,
		0,
		'"KDE 3.1" is no longer present as a single option.'
	);

	equal(
		$fixture.find( 'tbody tr' ).length,
		6,
		'There are 6 results that include "OSX.3+" or "KDE 3.1".'
	);

	$platform_widget.find( '.filter-term-osx3' ).click();
	equal(
		$fixture.find( 'tbody tr' ).length,
		1,
		'Removing  term "OSX.3+", leaving "KDE 3.1" search reduces results to 1.'
	);

	equal(
		$platform_widget.find( 'option[value="OSX.3+"]' ).length,
		1,
		'"OSX.3+" is once again present as a single option.'
	);

} );

test( 'exclude column', function() {
	var $fixture = $( '#qunit-fixture' ),
		$widgets;

	$('#example').dataTable( {
		"sDom": 'W<"clear">lfrtip',
		"oColumnFilterWidgets": {
			"aiExclude": [ 1 ]
		}
	} );

	$widgets = $fixture.find( '.column-filter-widget' );
	equal(
		$widgets.length,
		$fixture.find( 'thead th' ).length - 1,
		'There is not a widget for one table column.'
	);

	equal( 
		$widgets.find( 'option[value="Browser"]' ).length,
		0,
		'The Browser widget is missing.'
	);

	$widgets.eq( 0 ).find( 'select' ).val( 'KHTML' ).trigger( 'change' );
	equal(
		$fixture.find( 'tbody tr' ).length,
		3,
		'Remaining widget works.'
	);

} );

test( 'grouped terms', function() {
	var $fixture = $( '#qunit-fixture' ),
		$widgets,
		$selected_terms;

	$('#example').dataTable( {
		"sDom": 'W<"clear">lfrtip',
		"oColumnFilterWidgets": {
			"bGroupTerms": true
		}
	} );

	$selected_terms = $fixture.find( '.column-filter-widget-selected-terms' );
	equal(
		$selected_terms.length,
		1,
		'Selected terms area is present.'
	);

	$widgets = $fixture.find( '.column-filter-widget' );
	$widgets.eq( 0 ).find( 'select' ).val( 'Webkit' ).trigger( 'change' );
	equal( 
		$selected_terms.find( '.filter-term-webkit' ).length,
		1,
		'First selected term "Webkit" is added to term area.'
	);
	equal( 
		$widgets.eq( 0 ).find( 'option[value="Webkit"]' ).length,
		0,
		'"Webkit" is removed from widget.'
	);
	equal(
		$fixture.find( 'tbody tr' ).length,
		7,
		'"Webkit" filters 7 results.'
	);

	$widgets.eq( 2 ).find( 'select' ).val( 'OSX.4+' ).trigger( 'change' );
	equal(
		$selected_terms.find( '.filter-term-osx4' ).length,
		1,
		'"OSX.4+" is added to the term area when selected.'
	);
	equal( 
		$widgets.eq( 2 ).find( 'option[value="OSX.4+"]' ).length,
		0,
		'"OSX.4+" is removed from widget.'
	);
	equal(
		$fixture.find( 'tbody tr' ).length,
		3,
		'"Webkit" + "OSX.4+" filters 3 results.'
	);

	$selected_terms.find( '.filter-term-osx4' ).click();
	equal(
		$selected_terms.find( '.filter-term-osx4' ).length,
		0,
		'Clicking "OSX.4+" removes that term from the selected area.'
	);
	equal( 
		$widgets.eq( 2 ).find( 'option[value="OSX.4+"]' ).length,
		1,
		'"OSX.4+" is returned to the widget.'
	);
	equal(
		$fixture.find( 'tbody tr' ).length,
		7,
		'"Webkit" filters 7 results.'
	);

} );

test( 'limited selections', function() {
	var $fixture = $( '#qunit-fixture' ),
		$widgets;

	$('#example').dataTable( {
		"sDom": 'W<"clear">lfrtip',
		"oColumnFilterWidgets": {
			"iMaxSelections": 1
		}
	} );

	$widgets = $fixture.find( '.column-filter-widget' );
	$widgets.eq( 0 ).find( 'select' ).val( 'Misc' ).trigger( 'change' );
	equal(
		$widgets.eq( 0 ).find( 'select' ).attr( 'disabled' ),
		'disabled',
		'Engine widget is disabled after one selection.'
	);

	$widgets.eq( 4 ).find( 'select' ).val( 'C' ).trigger( 'change' );
	equal(
		$widgets.eq( 4 ).find( 'select' ).attr( 'disabled' ),
		'disabled',
		'Grade widget is disabled after one selection.'
	);

	$widgets.eq( 0 ).find( '.filter-term-misc' ).click();
	equal(
		$widgets.eq( 0 ).find( 'select' ).attr( 'disabled' ),
		undefined,
		'Engine widget is enabled again after clicking the term.'
	);
	equal(
		$widgets.eq( 4 ).find( 'select' ).attr( 'disabled' ),
		'disabled',
		'Grade widget is still disabled.'
	);

} );
