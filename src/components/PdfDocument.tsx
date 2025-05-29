
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { mcqData } from '../data/mcqData'; // Your questions data array

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  outerBorder: {
    border: '1px solid black',
    padding: 10,
    minHeight: '100%',
  },
  header: {
    textAlign: 'center',
    marginBottom: 5,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 10,
  },
  contentRow: {
    flexDirection: 'row',
    minHeight: '90%',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
  },
  column: {
    marginTop: 10,
    width: '50%',
    paddingRight: 5,
    paddingLeft: 5,
  },
  divider: {
    borderLeft: '1px solid black',
  },
  questionBlock: {
    marginTop: 10,
    marginBottom: 6,
  },
  option: {
    marginTop: 6,
    marginLeft: 10,
  },
});

// Maximum height in points allowed per column per page (adjust if needed)
// const MAX_HEIGHT = 700; // max height per column

// Estimate height of a question block based on text length
const estimateQuestionHeight = (questionObj) => {
  const baseHeight = 20; // padding + question text base height
  const charsPerLine = 50; // approx characters per line

  // Estimate lines for question text
  const questionLines = Math.ceil(questionObj.question.length / charsPerLine);
  // Estimate lines for each option similarly
  const optionsLines = questionObj.options.reduce((acc, opt) => {
    return acc + Math.ceil(opt.length / charsPerLine);
  }, 0);

  // total estimated lines
  const totalLines = questionLines + optionsLines;

  // height per line (approx)
  const lineHeight = 12; // pt

  return baseHeight + totalLines * lineHeight;
};

// Split questions into pages and columns based on estimated height
const PAGE_HEIGHT = 842;
const PAGE_PADDING = 20; // 10 top + 10 bottom
const HEADER_META_HEIGHT = 100;
const MAX_COLUMN_HEIGHT = PAGE_HEIGHT - PAGE_PADDING - HEADER_META_HEIGHT;

const splitQuestionsByColumn = (questions) => {
  const pages = [];
  let currentPage = { left: [], right: [] };
  let currentLeftHeight = 0;
  let currentRightHeight = 0;
  let i = 0;

  while (i < questions.length) {
    const question = questions[i];
    const qHeight = estimateQuestionHeight(question);

    if (currentLeftHeight + qHeight <= MAX_COLUMN_HEIGHT) {
      // Try to fill the left column first
      currentPage.left.push(question);
      currentLeftHeight += qHeight;
      i++;
    } else if (currentRightHeight + qHeight <= MAX_COLUMN_HEIGHT) {
      // Once left is full, start filling right
      currentPage.right.push(question);
      currentRightHeight += qHeight;
      i++;
    } else {
      // If both columns are full, push current page and reset
      pages.push(currentPage);
      currentPage = { left: [], right: [] };
      currentLeftHeight = 0;
      currentRightHeight = 0;
    }
  }

  // Push any remaining content
  if (currentPage.left.length > 0 || currentPage.right.length > 0) {
    pages.push(currentPage);
  }

  return pages;
};

const PdfDocument = () => {
  const questionPages = splitQuestionsByColumn(mcqData);

  return (
    <Document>
      {questionPages.map((page, pageIndex) => (
        <Page size="A4" style={styles.page} key={pageIndex}>
          <View style={styles.outerBorder}>
            <View style={styles.header}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                Vidyadip Education
              </Text>
              <Text>Vidyadip</Text>
            </View>

            <View style={styles.metadata}>
              <Text>Subject : BIOLOGY</Text>
              <Text>Date : 29-05-2025</Text>
            </View>

            <View style={styles.metadata}>
              <Text>Standard : STD 11 Science</Text>
              <Text>Time : 0h 0m</Text>
            </View>

            <Text style={styles.sectionTitle}>* M.C.Q (1 Marks) [20]</Text>

            <View style={styles.contentRow}>
              {/* Left Column */}
              <View style={styles.column}>
                {page.left.map((q) => (
                  <View key={q.questionNo} style={styles.questionBlock}>
                    <Text>
                      ({q.questionNo}) {q.question}
                    </Text>
                    {q.options.map((opt, i) => (
                      <Text key={i} style={styles.option}>
                        ({String.fromCharCode(65 + i)}) {opt}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>

              {/* Right Column */}
              <View style={[styles.column, styles.divider]}>
                {page.right.map((q) => (
                  <View key={q.questionNo} style={styles.questionBlock}>
                    <Text>
                      ({q.questionNo}) {q.question}
                    </Text>
                    {q.options.map((opt, i) => (
                      <Text key={i} style={styles.option}>
                        ({String.fromCharCode(65 + i)}) {opt}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default PdfDocument;
