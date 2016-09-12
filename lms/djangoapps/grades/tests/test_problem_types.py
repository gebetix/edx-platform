"""
Test that persistent grading works for different block types
"""
from path import Path

import ddt
from django.test import TestCase

from xmodule.modulestore.xml_importer import import_course_from_xml


TEST_DATA_DIR = Path(__file__).dirname() / 'data'  # pylint: disable=invalid-name


@ddt.ddt
class TestGradingProblemTypes(TestCase):
    """
    Test that grading works for different problem types
    """

    @ddt.data(
        'capa.xml',
        'openassessment.xml',
    )
    def test_save_grades_by_block_type(self, problem_file):
        course_key = 'x'

        course_xml = u"""
        <course>
          <chapter>
            <sequence>
              <vertical>
                {problem_data}
              </vertical>
            </sequence>
          </chapter>
        </course>
        """.format(problem_data=open(TEST_DATA_DIR / problem_data).read())

        import_course_from_xml(
            self.store,
            'test_user',
            TEST_DATA_DIR,
            source_dirs=['2014'],
            static_content_store=None,
            target_id=course_key,
            raise_on_failure=True,
            create_if_not_present=True,
        )


