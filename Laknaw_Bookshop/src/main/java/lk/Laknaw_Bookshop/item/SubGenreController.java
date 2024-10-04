package lk.Laknaw_Bookshop.item;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SubGenreController {

    @Autowired
    private SubGenreDao subgenredao;

    @GetMapping(value = "/subgenre/alldata", produces = "application/json")
    public List<SubGenre> allSubGenreList() {
        return subgenredao.findAll();
    }
}
