function initialize_search(filePath){
	d3.json(filePath, function(libraries){
		var placeHolder,
		    stateList = [],
		    numOfStates = libraries['states'].length,
		    numOfCounties,
		    numOfLibraries,
		    selectedState,
		    selectedCounty,
		    selectedLibrary;
		
		// Populate stateList array
		for(var i=0; i<numOfStates; i++){
			stateList.push(libraries['states'][i][0]['name']);
		}	
		
		// Begin building state select list
		placeHolder = "";
		placeHolder += "<select size='50' id='library_quick_search_select_state' class='library_quick_search_select'>";

		// Populate options
		for(var i=0; i<numOfStates; i++){
			placeHolder += ("<option value='" + stateList[i] + "'>" + stateList[i] + "</option>");
		}

		// Close select and deploy
		placeHolder += "</select>";
		$('library_quick_search_scroll_area').innerHTML = "";
		$('library_quick_search_scroll_area').innerHTML = placeHolder;

		// Add event to newly created select
		$('library_quick_search_select_state').addEvent('change', function(){
			addEventToMainStateSelect();
		});
		
		function addEventToMainStateSelect(){
			if($('library_quick_search_select_state').value === ""){
			} else {
				selectedState = $('library_quick_search_select_state').value;

				// Update Breadcrumbs
				$('current_selection_label_dynamic_container').innerHTML = ("<div class='current_selection_label_dynamic_scheme'>" + selectedState + "</div>");

				// Create
				$('library_quick_search_scroll_area').innerHTML = "";
				placeHolder = "";
				placeHolder += ("<select size='50' id='library_quick_search_select_county' class='library_quick_search_select' style='opacity: 0; visibility: hidden;'>");
				for(var i=0; i<numOfStates; i++){
					if(libraries['states'][i][0]['name'] === selectedState){
						numOfCounties = libraries['states'][i][0]['counties'].length;
						for(var j=0; j<numOfCounties; j++){
							placeHolder += ("<option value='" + libraries['states'][i][0]['counties'][j][0]['name'] + "'>" + libraries['states'][i][0]['counties'][j][0]['name'] + "</option>");
						}
					}
				}
				placeHolder += "</select>";
				placeHolder += "<div id='first_section_back_county' class='main_search_back_button' style='opacity: 0; visibility: hidden;'>Back To State List</div>";
				$('library_quick_search_scroll_area').innerHTML = placeHolder;

				// Fade In
				$('library_quick_search_select_county').set('tween', { duration: 1100 }).fade('in');
				$('first_section_back_county').set('tween', { duration: 1100 }).fade('in');

				// Add Events
                $('first_section_back_county').addEvent('click', function(){
                    countyBackButton();
                });

                $('library_quick_search_select_county').addEvent('change', function(){
                    if($('library_quick_search_select_county').value === ""){
                    } else {
                        selectedCounty = $('library_quick_search_select_county').value;
                        numOfCounties = $('library_quick_search_select_county').options.length;
                        addEventToMainCountySelect(selectedState, selectedCounty, numOfCounties);
                    }
                });
			}
		}
        function addEventToMainCountySelect(currentState, currentCounty, currentNumOfCounties){
            // Breadcrumbs
            placeHolder = "";
            placeHolder += ("<div class='current_selection_label_dynamic_scheme'>" + currentState + "</div>");
            placeHolder += ("<div class='current_selection_label_dynamic_space'>" + " :: " + "</div>");
            placeHolder += ("<div class='current_selection_label_dynamic_scheme'>" + currentCounty + "</div>");
            $('current_selection_label_dynamic_container').innerHTML = placeHolder;

            // Create
            $('library_quick_search_scroll_area').innerHTML = "";
            placeHolder = "";
            placeHolder += "<select size='50' id='library_quick_search_select_library' class='library_quick_search_select' style='opacity: 0; visibility: hidden;'>";
            for(var i=0; i<numOfStates; i++){
                if(libraries['states'][i][0]['name'] === currentState){
                    for(var j=0; j<currentNumOfCounties; j++){
                        if(libraries['states'][i][0]['counties'][j][0]['name'] === currentCounty){
                            numOfLibraries = libraries['states'][i][0]['counties'][j][0]['libraries'].length;
                            for(var k=0; k<numOfLibraries; k++){
                                placeHolder += ("<option value='" + libraries['states'][i][0]['counties'][j][0]['libraries'][k] + "'>" + libraries['states'][i][0]['counties'][j][0]['libraries'][k] + "</option>");
                            }
                        }
                    }
                }
            }
            placeHolder += "</select>";
            placeHolder += "<div id='first_section_back_to_state_library' class='main_search_back_button' style='opacity: 0; visibility: none;'>Back To State List</div>";
            placeHolder += "<div id='first_section_back_library' class='main_search_back_button' style='opacity: 0; visibility: none;'>Back To County List</div>";
            placeHolder += "<div class='clear'></div>";
            $('library_quick_search_scroll_area').innerHTML = placeHolder;

            // Fade In
            $('library_quick_search_select_library').set('tween', { duration: 1100 }).fade('in');
            $('first_section_back_to_state_library').set('tween', { duration: 1100 }).fade('in');
            $('first_section_back_library').set('tween', { duration: 1100 }).fade('in');

            // Add Events
            $('first_section_back_library').addEvent('click', function(){
                libraryBackButton(currentCounty, currentState);
            });
            $('first_section_back_to_state_library').addEvent('click', function(){
                libraryBackToStateButton();
            });
            $('library_quick_search_select_library').addEvent('change', function(){
                if($('library_quick_search_select_library').value === ""){
                } else {
                    // Events to be fired when library is selected
                }
            });
        }
        function countyBackButton(){
            // Breadcrumbs
            placeHolder = "";
            placeHolder += "<div class='current_selection_label_dynamic_scheme'>None Selected</div>";
            $('current_selection_label_dynamic_container').innerHTML = placeHolder;
            
            // Create
            placeHolder = "";
            placeHolder += "<select size='50' id='library_quick_search_select_state' class='library_quick_search_select' style='opacity: 0; visibility: hidden;'>";
            for(var i=0; i<numOfStates; i++){
                placeHolder += ("<option value='" + stateList[i] + "'>" + stateList[i] + "</option>");
            }
            placeHolder += "</select>";
            $('library_quick_search_scroll_area').innerHTML = "";
            $('library_quick_search_scroll_area').innerHTML = placeHolder;

            // Fade In
            $('library_quick_search_select_state').set('tween', { duration: 1100 }).fade('in');

            // Add Events
            $('library_quick_search_select_state').addEvent('change', function(){
                addEventToMainStateSelect();
            });

        }
        function libraryBackButton(currentCounty, currentState){
            // Breadcrumbs
            placeHolder = "";
            placeHolder += ("<div class='current_selection_label_dynamic_scheme'>" + currentState + "</div>");
            $('current_selection_label_dynamic_container').innerHTML = placeHolder;

            // Create
            $('library_quick_search_scroll_area').innerHTML = "";
            placeHolder = "";
            placeHolder += "<select size='50' id='library_quick_search_select_county' class='library_quick_search_select' style='opacity: 0; visibility: hidden;'>";
            for(var i=0; i<numOfStates; i++){
                if(libraries['states'][i][0]['name'] === currentState){
                    numOfCounties = libraries['states'][i][0]['counties'].length;
                    for(var j=0; j<numOfCounties; j++){
                        placeHolder += ("<option value='" + libraries['states'][i][0]['counties'][j][0]['name'] + "'>" + libraries['states'][i][0]['counties'][j][0]['name'] + "</option>");
                    }
                }
            }
            placeHolder += "</select>";
            placeHolder += "<div id='first_section_back_county' class='main_search_back_button' style='opacity: 0; visibility: hidden;'>Back To State List</div>";
            $('library_quick_search_scroll_area').innerHTML = placeHolder;

            // Fade In
            $('library_quick_search_select_county').set('tween', { duration: 1100 }).fade('in');
            $('first_section_back_county').set('tween', { duration: 1100 }).fade('in');
            
            // Add Events
            $('first_section_back_county').addEvent('click', function(){
                countyBackButton();
            });
            $('library_quick_search_select_county').addEvent('change', function(){
                if($('library_quick_search_select_county').value === ""){
                } else {
                    selectedCounty = $('library_quick_search_select_county').value;
                    numOfCounties = $('library_quick_search_select_county').options.length;
                    addEventToMainCountySelect(selectedState, selectedCounty, numOfCounties);
                }
            });
        }
        function libraryBackToStateButton(){
            // Breadcrumbs
            placeHolder = "";
            placeHolder += "<div class='current_selection_label_dynamic_scheme'>None Selected</div>";
            $('current_selection_label_dynamic_container').innerHTML = placeHolder;

            // Create
            placeHolder = "";
            placeHolder += "<select size='50' id='library_quick_search_select_state' class='library_quick_search_select' style='opacity: 0; visbility: hidden;'>";
            for(var i=0; i<numOfStates; i++){
                placeHolder += ("<option value='" + stateList[i] + "'>" + stateList[i] + "</option>");
            }
            placeHolder += "</select>";
            $('library_quick_search_scroll_area').innerHTML = "";
            $('library_quick_search_scroll_area').innerHTML = placeHolder;

            // Fade In
            $('library_quick_search_select_state').set('tween', { duration: 1100 }).fade('in'); 
            
            // Add Events
            $('library_quick_search_select_state').addEvent('change', function(){
                addEventToMainStateSelect();
            });
        }

	});
}
