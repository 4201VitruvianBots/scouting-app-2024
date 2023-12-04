import sys

# Aliases to handle javascript booleans
true = True
false = False

# ---------------------------------------------------------
# WRITE YOUR CODE HERE
#
# Limitations:
# - Arguments can only be made of primitive data types (str, list, int, dict)
# - Only 1 argument per function. If you need multiple arguments, take in a list that you then seperate into arguments
# ---------------------------------------------------------

def average(data):
    return sum(data) / len(data)

def find_min(data):
    return min(data)

def opposite(data):
    return not data

# Update every time you create a new function
callable_functions = {"average": average, "find_min": find_min, "opposite": opposite}

# ---------------------------------------------------------
# YOUR CODE ENDS HERE
# ---------------------------------------------------------


def main():
    global callable_functions, true, false

    str_function_name = sys.argv[1]
    str_function_arg = sys.argv[2]

    if str_function_name in list(callable_functions.keys()):
        function_to_run = callable_functions[str_function_name]
        print(function_to_run(eval(str_function_arg)))

if __name__ == "__main__":
    main()