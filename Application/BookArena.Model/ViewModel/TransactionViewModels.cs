﻿using System.ComponentModel.DataAnnotations.Schema;
using BookArena.Model.EntityModel;

namespace BookArena.Model.ViewModel
{
    [NotMapped]
    public class TransactionViewModel : Transaction
    {
        public TransactionViewModel()
        {
            FormattedBorrowedDate = BorrowedDate.ToString(Constant.FormattedDate);
            FormattedLastSubmissionDate = LastSubmissionDate.ToString(Constant.FormattedDate);
        }

        public string FormattedBorrowedDate { get; set; }
        public string FormattedLastSubmissionDate { get; set; }

        public Student Student { get; set; }
        public Book Book { get; set; }
    }
}