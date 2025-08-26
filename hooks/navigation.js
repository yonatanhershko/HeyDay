/**
 * Navigate to a route if not already there.
 * If navigating to home ("/"), use replace to avoid showing a back button.
 *
 * @param {string} pathname - The current path.
 * @param {Object} router - The router object from `useRouter`.
 * @param {string} targetRoute - The route to navigate to.
 */
export const navigateToRoute = (pathname, router, targetRoute) => {
  if (pathname !== targetRoute) {
    if (targetRoute === '/') {
      router.replace(targetRoute); // clears back stack
    } else {
      if (pathname === '/') {
        router.replace(targetRoute); // clears back stack
      } else {
        router.push(targetRoute); // adds to history
      }
    }
  }
};
