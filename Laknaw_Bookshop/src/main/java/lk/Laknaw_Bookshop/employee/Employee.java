package lk.Laknaw_Bookshop.employee;

import java.time.LocalDate;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "employee")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Integer id;

    @Column(name = "empnum", unique = true)
    @NotNull
    private String empno;

    @Column(name = "fullname")
    @NotNull
    private String fullname;

    @Column(name = "callingname")
    @NotNull // cannot be null
    private String callingname;

    @Column(name = "nic", unique = true, length = 8)
    @Length(max = 12, min = 10, message = "value length between 10-12")
    @NotNull // cannot be null
    private String nic;

    @Column(name = "gender")
    @NotNull // cannot be null
    private String gender;

    @Column(name = "dob")
    @NotNull // cannot be null
    private LocalDate dob;

    @Column(name = "mobile", length = 10)
    private String mobile;

    @Column(name = "address")
    @NotNull // cannot be null
    private String address;

    @Column(name = "civilstatus")
    @NotNull
    private String civilstatus;

    @Column(name = "email")
    @NotNull // cannot be null
    private String email;

    @Column(name = "emp_photo")
    private byte[] emp_photo;

    @Column(name = "emp_photo_name")
    private String emp_photo_name;

    @ManyToOne // relationship format
    @JoinColumn(name = "designation_id", referencedColumnName = "id") // join column
    private Designation designation_id;

    @ManyToOne // relationship format
    @JoinColumn(name = "employee_status_id", referencedColumnName = "id") // join column
    private EmployeeStatus employeestatus_id;
}
