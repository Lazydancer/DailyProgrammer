def convertToNumeral(number):
  coding = zip( [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9 , 5, 4, 1],
    ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'])
  result = []
  print(type(coding))
  for num, sym in coding:
    while number >= num:
      result.append(sym)
      number -= num 
  return ''.join(result)

def convertToNumber(numeral):
  return 123

def main():
  user_input = input('Enter a number or a Roman Numeral: ')
 
  if(user_input.isdigit()):
    result = convertToNumeral(int(user_input))
  else:
    result = convertToNumber(user_input)

  print(result)

if __name__ == '__main__':
  main()
