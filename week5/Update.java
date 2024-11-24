//package w5;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Scanner;
public class Update {
    private static final String UPDATE_QUERY_NAME = "UPDATE student_table SET student_name = ? WHERE id = ?";
    private static final String UPDATE_QUERY_ADDRESS = "UPDATE student_table SET address = ? WHERE id = ?";

    public static void main(String[] args) {
        Scanner scn = new Scanner(System.in);

        // Load the JDBC driver
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        // Create the connection
        try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3308/student_table", "root", "1234")) {
            while (true) {
                System.out.println("\nEnter student ID:");
                int studentId = scn.nextInt();
                
                System.out.println("Choose an option to update:");
                System.out.println("1. Update Name");
//                System.out.println("2. Update Age");
                System.out.println("2. Update Address");
                System.out.println("3. Exit");
                int choice = scn.nextInt();

                String query = null;
                switch (choice) {
                    case 1:
                        query = UPDATE_QUERY_NAME;
                        System.out.println("Enter new name:");
                        break;
                    case 2:
                        query = UPDATE_QUERY_ADDRESS;
                        System.out.println("Enter new address:");
                        scn.nextLine(); // Consume the newline left by nextInt()
                        break;
                    case 3:
                        System.out.println("Exiting...");
                        return;
                    default:
                        System.out.println("Invalid choice. Try again.");
                        continue;
                }
                try (PreparedStatement ps = con.prepareStatement(query)) {
                    if (choice == 1 || choice == 2) {
                        String input = scn.next();
                        ps.setString(1, input);
//                    } else if (choice == 2) {
//                        int input = scn.nextInt();
//                        ps.setInt(1, input);
                    //}
                    ps.setInt(2, studentId);

                    int count = ps.executeUpdate();
                    if (count == 0) {
                        System.out.println("Record not updated. Please check the ID.");
                    } else {
                        System.out.println("Record updated successfully.");
                    }
                }
            }
        } 
        }
            catch (SQLException se) {
            System.out.println("SQL Error: " + se.getMessage());
            se.printStackTrace();
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}




