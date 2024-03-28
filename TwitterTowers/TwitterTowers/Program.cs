int choice;
while (true)
{
    Console.Write("choose: 1 to rectangle, 2 to triangle, 3 to exit  ");
    choice=int.Parse(Console.ReadLine());
    switch (choice)
    {
        case 1:
            Console.WriteLine("rectangle");
            Rectangle();
            break;
        case 2:
            Console.WriteLine("triangle");
            Triangle();
            break;
        case 3:
            Console.WriteLine("exit");
            return;
        default:
            Console.WriteLine("you chose wrong");
            break;
    }
}

//Function that handles the triangle
static void Triangle()
{
    int height, width;
    GetDimensions(out height, out width);//Picks up the values

    Console.WriteLine("Choose action for the triangle: \n1. Calculate perimeter \n2. Print the triangle");

    int triangleChoice = int.Parse(Console.ReadLine());

    switch (triangleChoice)
    {
        case 1:
            TrianglePerimeter(height, width);
            break;
        case 2:
            if(width % 2 == 0 || width > height * 2)
            {
                Console.WriteLine("The triangle cannot be printed");
                break;
            }
            PrintTriangle(height, width);
            break;
        default:
            Console.WriteLine("Invalid choice.");
            break;
    }
}
//printing the perimeter of the triangle
static void TrianglePerimeter(int height, int width)
{
    double perimeter = width + (Math.Sqrt(height * height + width * width)) * 2;//base + shins*2
    Console.WriteLine($"The perimeter of the triangle is: {perimeter}");
}


static void PrintTriangle(int height, int width)
{
    //Print the first line - one asterisk
    Console.WriteLine(new string(' ', width / 2) + "*");

    if (width > 3)
    {
        int asterisk = 3;//The next constellation that is printed ***
        int odd = (width - 2) / 2;//odd number
        int numInGroup = (height - 2) / odd;// Number of repetitions on each row 
        int spare = (height - 2) % odd;//How many to add to the first group
        //Printing the spare lines
        if (spare != 0)
        {
            for (int i = 0; i < spare; i++)
            {
                Console.WriteLine(new string(' ', (width / 2) - 1) + new string('*', asterisk));
            }
        }
        //Print the rest of the lines
        for (int i = 0; i < odd; i++)
        {
            for (int j = 0; j < numInGroup; j++)
            {
                Console.WriteLine(new string(' ', (width / 2) - (i + 1)) + new string('*', asterisk));
            }
            asterisk += 2;
        }
    }
    else
        PrintTinyTriangle(height-2, width);

    //הדפסת השורה האחרונה - כל הכוכביות
    Console.WriteLine(new string('*', width));

}
//In case the width is less than or equal to three, a special triangle is printed
//Because it has no odd numbers between it and the first row - 1
static void PrintTinyTriangle(int n, int width)
{
    if (width == 3)
        for (int i = 0; i < n; i++)
        {
            Console.WriteLine(new string(' ', 1) + "*");
        }
    else
        for (int i = 0; i < n; i++)
        {
            Console.WriteLine("*");
        }
}

//The function that handles the rectangle
static void Rectangle()
{
    int height, width;
    GetDimensions(out height, out width);// Receiving the values in the function
    if (width == height || Math.Abs(height-width) > 5)
        Console.WriteLine($"The area of the rectangle (it's can be a squar): {width*height} ");
    else Console.WriteLine($"the perimeter of the rectangle is: {width * 2 + height * 2}" );  
}


//Receiving the values of the height and width with a pointer variable
static void GetDimensions(out int height, out int width)
{
    Console.Write("Enter height: ");
    height = int.Parse(Console.ReadLine());
    Console.Write("Enter width: ");
    width = int.Parse(Console.ReadLine());
}


