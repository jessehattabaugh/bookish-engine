/** conditionally performs a view transition
 * @param {function} manipulate - performs the DOM manipulation
 */
export async function doTransition(manipulate) {
	/** @see https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition */
	if (document.startViewTransition) {
		await document.startViewTransition(() => {
			//console.debug('view transition starting');
			manipulate();
		}).finished;
	} else {
		//console.debug('view transition not supported');
		manipulate();
	}
}
