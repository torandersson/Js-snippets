class window.PlaceHolder
	constructor: (elements) ->
		@elements =
		 inputs : elements
		
		@pairs = []

		@placeHolderClassName = "p-l-a-c-e-h-o-l-d-e-r"
		@createPlaceHolder()
		@bindEvents()
				 
	createPlaceHolder: () ->
		for current in @elements.inputs
			tagToCreate = current.tagName
			createdTag = document.createElement(tagToCreate);
			$(current).before(createdTag)
			if tagToCreate is "INPUT"
				createdTag.value = $(current).val() 
				$(current).val("")
			
			pair =
				elem : current
				placeHolder: createdTag
						
			@pairs.push(pair)

		
		@positioning()
		
		
	positioning: () ->
		
		for pair in @pairs
			pos  = $(pair.elem).position()
			$(pair.placeHolder).css "position":"absolute"
			$(pair.placeHolder).css "z-index":"0"
			$(pair.elem).css 'background-color' : 'transparent'
			pos  = $(pair.elem).position()
			$(pair.placeHolder).addClass(@placeHolderClassName)
			$(pair.placeHolder).css({ "left": (pos.left) + "px", "top":pos.top + "px" });

	bindEvents: () ->
		$(@elements.inputs).each ->
			$(this).focus ->
				$(this).css 'background-color' : '#FFF'
			
			$(this).blur ->
				if not $(this).val()
					$(this).css 'background-color' : 'transparent'
		
		#IE FIX hmmm
		$($("."+@placeHolderClassName)).focus ->
			$(this).next('input, textarea').focus();
	   

# Base application control class. Instantiated on pageload.
class Application
	constructor: ->
		@elements =
			input: $("input")
		@placeHolder = new PlaceHolder(@elements.input)
		

# Let's start this baby up
$ -> window.app = new Application


		

