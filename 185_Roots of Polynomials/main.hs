  main :: IO ()
  main = print $ newton function function' xi
    where   
      function = applyPoly poly
      function' = applyPoly (derive poly)
      xi = 1.04

  poly = [1,2,3,4,5,6,7,8] 

  newton :: (Fractional a, Ord a) => (a -> a) -> (a -> a) -> a -> a
  newton f f' x
      | (abs (f x)) < epsilon = x
      | otherwise = newton f f' (x - (f x / f' x))
    where
      epsilon = 1e-4

  applyPoly :: Fractional b => [b] -> b -> b
  applyPoly formula x = foldl (+) 0.0 $ zipWith (*) formula $  map (x ^) $ expon formula

  derive :: (Enum a, Num a) => [a] -> [a]
  derive xs = [0] ++ init (zipWith (*) (expon xs) xs)

  expon :: Num b => [a] -> [b]
  expon xs = map fromIntegral (reverse [0..(length xs)-1])


