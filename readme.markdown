This is an add-on for the DataTables plugin for jQuery that creates filtering widgets based on the data in table columns. 

Widgets are grouped in a layout element, independent of source columns. 

Multiple selections can be made for a column, and other widgets adjust to reflect the results.

Multiple values can be parsed from a single table cell using a delimiter (like a comma).

Selections can be grouped with the source dropdown, or all together in a common layout element.

Selections can be removed individually.

Examples: http://cyberhobo.github.io/column-filter-widgets-examples/extras/ColumnFilterWidgets/index.html

Working with DataTables
=======================

Find the DataTables source here: https://github.com/DataTables/DataTables

The included examples will only work within the DataTables source tree. Here's a quick git checkout:

	$ git clone git@github.com:DataTables/DataTables.git
	Cloning into DataTables...
	...
	$ cd DataTables
	$ mkdir extras
	$ cd extras
	$ git clone git@github.com:cyberhobo/ColumnFilterWidgets.git
	Cloning into ColumnFilterWidgets...

For DataTables usage, please refer to the DataTables web-pages: http://www.datatables.net

The ColumnFilterWidgets source can be found in the media/js/ directory of this source tree.


Options
=======

Options are specified as a DataTables option, in an object called `oColumnFilterWidgets`:

	$( '#example_table' ).dataTable( { 
		bPaginate: true,
		sDom: 'Wlfriptip',
		sPaginationType: 'full_numbers',
		oColumnFilterWidgets: {
			aiExclude: [ 0, 6 ],
			sSeparator: ',  ',
			bGroupTerms: true,
			aoColumnDefs: [
				{ bSort: false, sSeparator: ' / ', aiTargets: [ 2 ] },
				{ fnSort: function( a, b ) { return a-b; }, aiTargets: [ 3 ] }
			]
				
		}
	} );
	
The possible options are:

 * `aiExclude` - an array of column indices for which column filter widgets should *not* be created.
 * `bGroupTerms` - enable grouping of selected terms in a single `div` element.
 * `sSeparator` - enable parsing of column contents into multiple terms separated by this string.
 * `iMaxSelections` - allow at most this number of selections from each column filter widget.

Contributing
============

[Github](https://github.com/cyberhobo/ColumnFilterWidgets) offers ways to contribute code, write documentation, submit issues, suggest features, etc. Go nuts!

[Donations](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QP5Q99BW2B3M2) are always encouraging.

License
=======

ColumnFilterWidgets uses the same license as DataTables. DataTables is released with dual licensing, using the GPL v2 (license-gpl2.txt) and an BSD style license (license-bsd.txt). Please see the corresponding license file for details of these licenses. You are free to use, modify and distribute this software, but all copyright information must remain.

