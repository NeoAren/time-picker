//
// Scroll to a target element inside a container
//

/**
 * Scroll to a target element inside a container
 * @param {string} containerID The DOM ID of the container
 * @param {string} targetID The DOM ID of the target
 * @param {boolean} jump Jump instead of scrolling, default: false
 */

const scrollToItem = (containerID, targetID, jump = false) => {

	// Validate the provided arguments
	if (typeof containerID !== 'string') throw Error(`The container element ID should be 'string', received '${typeof containerID}' instead.`);
	if (typeof targetID !== 'string') throw Error(`The target element ID should be 'string', received '${typeof targetID}' instead.`);
	if (typeof jump !== 'boolean') throw Error(`The 'jump' argument should be 'boolean', received '${typeof jump}' instead.`);

	// Get and validate the container and target elements
	const containerElement = document.getElementById(containerID);
	const targetElement = document.getElementById(targetID);
	if (!containerElement) throw Error(`The container element with the ID '${containerID}' does not exist in the DOM.`);
	if (!targetElement) throw Error(`The target element with the ID '${targetID}' does not exist in the DOM.`);

	// Calculate the offset of the target element
	const offsetOfFirstChild = targetElement.parentNode.children[0].offsetTop;
	const offsetOfTargetElement = targetElement.offsetTop - offsetOfFirstChild;

	// Jump to the target element without scrolling
	if (jump) {
		containerElement.scrollTop = offsetOfTargetElement;
		return;
	}

	// Continuously scroll to the target element
	const scroll = setInterval(() => {

		// Get the distance from the target element
		const currentScrollPosition = containerElement.scrollTop;
		const distanceFromTargetElement = offsetOfTargetElement - currentScrollPosition;

		// Scroll in the direction of the target element, step = 10 or the remaining distance
		if (distanceFromTargetElement < 0) {
			if ((distanceFromTargetElement + 10) < 0) {
				containerElement.scrollBy(0, -10);
			} else {
				containerElement.scrollBy(0, distanceFromTargetElement);
			}
		} else if (distanceFromTargetElement > 0) {
			if ((distanceFromTargetElement - 10) > 0) {
				containerElement.scrollBy(0, 10);
			} else {
				containerElement.scrollBy(0, distanceFromTargetElement);
			}
		} else {
			clearInterval(scroll);
		}

	}, 10);

};

export default scrollToItem;
