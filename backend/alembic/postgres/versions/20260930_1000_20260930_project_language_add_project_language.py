"""add project content language

Revision ID: 20260930_project_language
Revises: 20260914_knowledge
Create Date: 2026-09-30 10:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '20260930_project_language'
down_revision: Union[str, None] = '20260914_knowledge'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        'projects',
        sa.Column(
            'language',
            sa.String(length=10),
            nullable=False,
            server_default='zh',
            comment='小说内容语言: zh/en/vi（创建后不可更改）',
        ),
    )


def downgrade() -> None:
    op.drop_column('projects', 'language')
