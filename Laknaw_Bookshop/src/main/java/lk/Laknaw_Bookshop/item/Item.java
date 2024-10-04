package lk.Laknaw_Bookshop.item;

import java.time.LocalDate;
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
@Table(name = "item")

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    @NotNull
    private Integer id;

    @Column(name = "itemcode")
    @NotNull
    private String itemcode;

    @Column(name = "booktitle")
    @NotNull
    private String booktitle;

    @Column(name = "author")
    @NotNull
    private String author;

    @Column(name = "purchaseprice")
    @NotNull
    private Integer purchaseprice;

    @Column(name = "saleprice")
    @NotNull
    private Integer saleprice;

    @Column(name = "description")
    public String description;

    @Column(name = "rop")
    public Integer rop;

    @Column(name = "quantity")
    @NotNull
    public Integer quantity;

    @Column(name = "addeddate")
    @NotNull
    private LocalDate addeddate;

    // @ManyToOne
    // @JoinColumn(name = "unittype_id", referencedColumnName = "id")
    // private Unittype unittype_id;
    @ManyToOne
    @JoinColumn(name = "packagetype_id", referencedColumnName = "id")
    private Packagetype packagetype_id;
    @ManyToOne
    @JoinColumn(name = "bookstatus_id", referencedColumnName = "id")
    private BookStatus bookstatus_id;
    @ManyToOne
    @JoinColumn(name = "brand_id", referencedColumnName = "id")
    private Brand brand_id;
    @ManyToOne
    @JoinColumn(name = "genre_id", referencedColumnName = "id")
    private SubGenre genre_id;
    @ManyToOne
    @JoinColumn(name = "subgenre_id", referencedColumnName = "id")
    private SubGenre subgenre_id;
}
