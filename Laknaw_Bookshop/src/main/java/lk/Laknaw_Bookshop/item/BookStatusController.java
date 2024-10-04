package lk.Laknaw_Bookshop.item;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookStatusController {

    @Autowired
    private BookStatusDao bookstatusdao;

    @GetMapping(value = "/bookstatus/alldata", produces = "application/json")
    public List<BookStatus> allBookStatusList() {
        return bookstatusdao.findAll();
    }
}
