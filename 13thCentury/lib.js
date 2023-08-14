/** conditionally performs a view transition
 * @param {function} render - performs the DOM manipulation
 */
export async function doTransition(render) {
	/** @see https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition */
	if (document.startViewTransition) {
		await document.startViewTransition(() => {
			//console.debug('view transition starting');
			render();
		}).finished;
	} else {
		//console.debug('view transition not supported');
		render();
	}
}
