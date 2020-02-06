
export interface ICompare {
  (a : any, b: any) : number
}

/**
 * return a new array of elements sorted using the compare
 * function supplied (leave the existing array untouched)
 *
 * @param inpuArray array to be sorted
 * @param compare   callback function used for camparing
 *                  elements in the array
 * @param deep      whether or not to do deep cloning of
 *                  the array
 */
export const pureSort = (
  inpuArray : any[],
  compare: ICompare,
  deep = false
) : any[] => {
  let output : any[]

  if (deep === true) {
    // lets do a deep clone so everything we're sorting is
    // completely new
    output = JSON.parse(JSON.stringify(inpuArray))
  } else {
    // Lets do a shallow clone we're not changing the children
    // so no need to clone them as well
    output = [...inpuArray]
  }

  // Do the business (and sort that array)
  output.sort(compare)

  // Give them te new sorted array
  return output
}
