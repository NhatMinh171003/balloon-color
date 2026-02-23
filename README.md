# Game đọc thơ và tô màu bóng bay
- Game gồm 3 màn
- Màn 1: Đọc thơ
- Màn 2: Nghe và đọc lại theo cô giáo
- Màn 3: Tô màu bóng bay và chữ O
## Màn hình 1: ReadScene - Đọc thơ
- Đây là màn hình để đọc thơ
- Sau khi đọc xong bé bấm vào nút "Loa" để sang màn hình đọc thơ - SpeakScene
## Màn hình 2: SpeakScene - Nghe và đọc lại theo cô giáo
- Đây là màn hình để nghe cô giáo đọc thơ và lặp lại
## Màn hình 3: OnColorScene - Tô màu bóng bay và chữ O
- Đây là màn hình để tô màu bóng bay và chữ O
- Chọn màu ở bảng màu bên dưới và tô vào hình 

## Yêu cầu - flow:
1. ReadScene trong khi nghe hướng dẫn sẽ không thể bấm nút chơi lại hay chuyển qua màn hình SpeakScneen 
2. khi vào màn hình sẽ delay rồi mới đọc thơ để bé có thời gian phản ứng, trong khi nghe thơ nếu bấm nút chơi lại sẽ dừng đọc và chơi lại
3. Sau khi nghê hết thờ sẽ chuyển qua màn hình Tô màu OnColorScene
4. Khi vào màn hình tô màu sẽ đọc hướng dẫn chơi, và sẽ không thể thao tác cho đến khi đọc xong hướng dẫn
5. Sau khi tô hết các hình thì sẽ chuyển qua màn hình end game