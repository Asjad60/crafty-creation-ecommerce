export default function GetAvgRating(ratingArr) {
  if (ratingArr?.length === 0) return 0;
  const totalReviewCount = ratingArr?.reduce((acc, curr) => {
    acc += curr.rating;
    return acc;
  }, 0);

  const multiplier = Math.pow(10, 1); // 10 ki power 1
  const avgReviewCount =
    Math.round((totalReviewCount / ratingArr?.length) * multiplier) /
    multiplier;
  return avgReviewCount;

  // const avgReviewCount = (totalReviewCount / ratingArr.length).toFixed(1);
  // return parseFloat(avgReviewCount);
}
