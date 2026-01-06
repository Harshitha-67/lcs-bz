// sos.js
// Subset Sum using Dynamic Programming

export function subsetSum(arr, sum) {
  const n = arr.length

  // DP table
  const dp = Array.from({ length: n + 1 }, () =>
    Array(sum + 1).fill(false)
  )

  // Base case: sum = 0 is always possible
  for (let i = 0; i <= n; i++) {
    dp[i][0] = true
  }

  // Fill DP table
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= sum; j++) {
      if (arr[i - 1] <= j) {
        dp[i][j] =
          dp[i - 1][j] || dp[i - 1][j - arr[i - 1]]
      } else {
        dp[i][j] = dp[i - 1][j]
      }
    }
  }

  return dp[n][sum]
}
